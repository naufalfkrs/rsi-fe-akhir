<script setup lang="ts">
import { useRoute, useRouter } from "#app";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from "qrcode";
import { computed, onMounted, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();

const form = ref({
  user_id: [],
  tembusan: "",
  penerima: "",
  template: "",
  deskripsi: "",
  lampiran: "",
  type_approval: "",
  signature: "",
  replacement_signature: "",
  phone: [],
  email: [],
});

const authStore = useAuthStore();
const users = reactive<any>({
  tembusan: [],
  penerima: [],
  tandatangan: [],
  persetujuan: [],
});
const status = ref(null);
const is_read = ref<any>(null);
const selectedUser = ref(null);
const selectedPhone = ref(null);
const selectedEmail = ref(null);
const approvalMethod = ref("");
const errors = ref({});
const loggedInUserId = ref("");
const toast = useToast();
const permissions = ref([
  "tembusan",
  "persetujuan",
  "tandatangan",
  "suratmasuk",
]);
const openTembusan = ref<boolean>(false);
const openPenerima = ref<boolean>(false);
const openPersetujuan = ref<boolean>(false);
const openTandatangan = ref<boolean>(false);
const openReplacementSignature = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const fetchUsers = async () => {
  try {
    const promises = permissions.value.map((permission: any) =>
      $api.get(`/v1/user/getall/${permission}`)
    );

    const responses = await Promise.all(promises);
    users.tembusan = [];
    users.penerima = [];
    users.tandatangan = [];

    responses.forEach((response, index) => {
      const { data } = response.data;
      const permission = permissions.value[index];

      if (permission === "tembusan") {
        users.tembusan = data;
      } else if (permission === "suratmasuk") {
        users.penerima = data;
      } else if (permission === "tandatangan") {
        users.tandatangan = data;
      } else if (permission === "persetujuan") {
        users.persetujuan = data;
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const filterSignatures = computed(() => {
  return users.tandatangan.filter(
    (signature: any) => signature.id !== form.value.signature
  );
});

const fetchLetter = async (id) => {
  isLoading.value = true;
  try {
    const { data } = await $api.get(`/v1/letter/getid/${id}`);
    Object.assign(form.value, data.data);
    status.value = data.data.status;
    approvalMethod.value = determineApprovalMethod(data.data);
    is_read.value = data.data.is_reads;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching letter:", error);
  }
};

const determineApprovalMethod = (letterData) => {
  if (letterData.user_id && letterData.user_id.length) return "web";
  if (letterData.phone && letterData.phone.length) return "no_wa";
  if (letterData.email && letterData.email.length) return "email";
  return "";
};

const addUser = () => {
  if (selectedUser.value && !form.value.user_id.includes(selectedUser.value)) {
    form.value.user_id.push(selectedUser.value);
    selectedUser.value = null;
  }
};

const removeUser = (userId) => {
  form.value.user_id = form.value.user_id.filter((id) => id !== userId);
};

const removeAllUsers = () => {
  form.value.user_id = [];
};

const addPhone = () => {
  if (selectedPhone.value) {
    if (isValidPhone(selectedPhone.value)) {
      if (
        selectedPhone.value &&
        !form.value.phone.includes(selectedPhone.value)
      ) {
        form.value.phone.push(selectedPhone.value);
        selectedPhone.value = null;
        errors.value.phone = "";
      }
    } else {
      errors.value.phone = "Invalid phone number format.";
    }
  }
};

const removePhone = (phone: string) => {
  form.value.phone = form.value.phone.filter((p) => p !== phone);
};

const removeAllPhones = () => {
  form.value.phone = [];
};

const addEmail = () => {
  if (selectedEmail.value) {
    if (isValidEmail(selectedEmail.value)) {
      if (
        selectedEmail.value &&
        !form.value.email.includes(selectedEmail.value)
      ) {
        form.value.email.push(selectedEmail.value);
        selectedEmail.value = null;
        errors.value.email = "";
      }
    } else {
      errors.value.email = "Invalid email format.";
    }
  }
};

const removeEmail = (email: string) => {
  form.value.email = form.value.email.filter((e) => e !== email);
};

const removeAllEmails = () => {
  form.value.email = [];
};

const getUserName = (id: string) => {
  const user = users.persetujuan.find((user) => user.id === id);
  return user ? `${user.name} - ${user.roles}` : "";
};

const getRolePhone = (id: string) => {
  const user = users.persetujuan.find((user) => user.phone_number === id);
  return user ? `${user.phone_number} - ${user.roles}` : '';
};

const getRoleEmail = (id: string) => {
  const user = users.persetujuan.find((user) => user.email === id);
  return user ? `${user.email} - ${user.roles}` : '';
};

const validateForm = () => {
  const newErrors = {};
  if (!form.value.template) {
    newErrors.template = "Kolom template harus diisi.";
  }
  if (!form.value.penerima) {
    newErrors.penerima = "Kolom penerima harus diisi.";
  }
  if (!form.value.deskripsi) {
    newErrors.deskripsi = "Kolom deskripsi harus diisi.";
  }
  if (!approvalMethod.value) {
    newErrors.approvalMethod = "Kolom metode approval harus diisi.";
  }
  if (!form.value.type_approval) {
    newErrors.type_approval = "Kolom tipe approval harus diisi.";
  }
  if (approvalMethod.value === "web" && form.value.user_id.length === 0) {
    newErrors.user_id = "Minimal satu persetujuan pengguna diperlukan.";
  }
  if (approvalMethod.value === "no_wa" && form.value.phone.length === 0) {
    newErrors.phone = "Minimal satu nomor telepon diperlukan.";
  }
  if (approvalMethod.value === "email" && form.value.email.length === 0) {
    newErrors.email = "Minimal satu email diperlukan.";
  }
  if (!form.value.signature) {
    newErrors.signature = "Kolom tanda tangan harus diisi.";
  }
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
  const phoneRegex = /^\+?[0-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

const submitForm = async () => {
  if (validateForm()) {
    try {
      await $api.put(`/v1/letter/${route.params.id}`, form.value);
      toast.success("Berhasil mengubah surat");
      router.push("/dashboard/surat");
    } catch (error) {
      console.error("Error saving letter:", error);
      toast.error("An error occurred while saving the letter.");
    }
  }
};

const goBack = () => {
  router.back();
};

const updateStatus = async (status: string) => {
  try {
    await $api.put(`/v1/letter/status/${route.params.id}`, {
      status: status,
    });
    if (status == "menunggu_persetujuan") {
      if (approvalMethod.value === "email") {
        updateApprovalStatusAndSendEmail();
      } else if (approvalMethod.value === "no_wa") {
        updateApprovalStatusAndSendWhatsApp();
      } else {
        toast.success("Berhasil mengirimkan surat ke approval");
        router.push("/dashboard/surat");
      }
    } else if (status == "terkirim") {
      toast.success("Berhasil mengirimkan surat ke penerima");
      router.push("/dashboard/surat");
    }
  } catch (error) {
    console.error("Error updating letter status:", error);
    toast.error("An error occurred while updating the letter status.");
  }
};

const updateApprovalStatusAndSendEmail = async () => {
  const emailArray = form.value.email;
  const template = form.value.template;
  const letterId = route.params.id;
  try {
    await $api.post("/v1/send-email", {
      email: emailArray[0],
      template: template,
      letter_id: letterId,
      order: 1,
    });
    toast.success("Link approval telah dikirim ke email yang dituju");
  } catch (error) {
    console.error("Error sending email:", error);
  }
  router.push("/dashboard/surat");
};

const updateApprovalStatusAndSendWhatsApp = async () => {
  const phoneNumberArray = form.value.phone;
  const template = form.value.template;
  const letterId = route.params.id;
  try {
    await $api.post("/v1/send-whatsapp", {
      phoneNumber: phoneNumberArray[0],
      template: template,
      letter_id: letterId,
      order: 1,
    });
    toast.success("Link approval telah dikirim ke nomor WhatsApp yang dituju");
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
  router.push("/dashboard/surat");
};

const generateQRCode = async () => {
  try {
    const letterId = route.params.id;
    const tokenResponse = await $api.get(`/v1/letter/${letterId}/token`);
    const existingToken = tokenResponse.data.token;

    if (existingToken) {
      router.push("/dashboard/surat");
    } else {
      const url = `${window.location.origin}/letter/${letterId}/proof`;
      const uniqueCode = generateUniqueCode();
      const securedUrl = `${url}?token=${uniqueCode}`;

      const qrCodeUrl = await QRCode.toDataURL(securedUrl);

      await $api.post(`/v1/letter/${letterId}/token`, {
        token: uniqueCode,
      });

      router.push("/dashboard/surat");
    }
    toast.success("QR Code berhasil dibuat");
  } catch (error) {
    console.error("Error generating QR Code:", error);
    toast.error("An error occurred while generating the QR Code.");
  }
};

const generateUniqueCode = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const token = btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return token;
};

onMounted(() => {
  loggedInUserId.value = authStore.user?.id;
  fetchLetter(route.params.id);
  fetchUsers();
});

const isApprovalMethodDisabled = computed(() => {
  return (
    form.value.user_id.length > 0 ||
    form.value.phone.length > 0 ||
    form.value.email.length > 0
  );
});

const isTypeApprovalDisabled = computed(() => {
  return (
    form.value.user_id.length > 0 ||
    form.value.phone.length > 0 ||
    form.value.email.length > 0
  );
});

const isInputDisabled = computed(() => {
  return form.value.type_approval.length < 1;
});

const isTemplateDisabled = computed(() => {
  return form.value.template === "undangan" || form.value.template === "memo";
});

watch(
  () => form.value.template,
  (newTemplate) => {
    // if (newTemplate === "undangan") {
    //   form.value.approvalMethod = "no_wa";
    //   form.value.type_approval = "single";
    //   form.value.phone = ["08233111"];
    //   form.value.user_id = [];
    //   form.value.email = [];
    //   approvalMethod.value = "no_wa";
    // } else if (newTemplate === "memo") {
    //   form.value.approvalMethod = "email";
    //   form.value.type_approval = "paralel";
    //   form.value.phone = [];
    //   form.value.user_id = [];
    //   form.value.email = ["a@mail.com", "b@mail.com"];
    //   approvalMethod.value = "email";
    // } else {
      if (approvalMethod.value === "email") {
        form.value.approvalMethod = "email";
        form.value.type_approval;
        form.value.phone = [];
        form.value.user_id = [];
        form.value.email;
        approvalMethod.value = "email";
      } else if (approvalMethod.value === "no_wa") {
        form.value.approvalMethod = "no_wa";
        form.value.type_approval;
        form.value.phone;
        form.value.user_id = [];
        form.value.email = [];
        approvalMethod.value = "no_wa";
      } else if (approvalMethod.value === "web") {
        form.value.approvalMethod = "web";
        form.value.type_approval;
        form.value.phone = [];
        form.value.user_id;
        form.value.email = [];
        approvalMethod.value = "web";
      }
    // }
  }
);

const isLocked = ref(true);

const toggleLock = () => {
  isLocked.value = !isLocked.value;
};

const isFormDisabled = computed(() => {
  return (
    !isLocked.value ||
    status.value == "menunggu_persetujuan" ||
    status.value == "menunggu_tanda_tangan" ||
    status.value == "disetujui" ||
    status.value == "terkirim"
  );
});

definePageMeta({
  middleware: ["auth", "permission"],
});
</script>

<template>
  <div>
    <Card class="max-w-7xl mx-auto p-6 mt-6 mb-6 shadow-md rounded-md">
      <CardHeader class="ml-4 mr-4">
        <div class="flex justify-between mb-4">
          <div>
            <Button @click="goBack">
              <Icon
                name="material-symbols:arrow-back-rounded"
                size="25"
                class="bg-white"
              />
            </Button>
          </div>

          <div v-if="status === 'menunggu_persetujuan'" class="space-x-4">
            <button class="bg-gray-500 text-white font-bold py-2 px-4 rounded">
              Menunggu Persetujuan
            </button>
          </div>
          <div v-if="status === 'menunggu_tanda_tangan'" class="space-x-4">
            <button class="bg-gray-500 text-white font-bold py-2 px-4 rounded">
              Menunggu Tanda Tangan
            </button>
          </div>
          <AlertDialog v-if="status === 'disetujui'">
            <AlertDialogTrigger as-child>
              <div class="space-x-4">
                <Button class="font-bold">Kirim ke Penerima</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kirim Surat ke Penerima?</AlertDialogTitle>
                <AlertDialogDescription
                  >Setelah surat terkirim tidak dapat ditarik
                  kembali</AlertDialogDescription
                >
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction @click="updateStatus('terkirim')"
                  >Kirim</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div v-if="status === 'terkirim'" class="space-x-4">
            <Button
              disabled
              class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >Terkirim</Button
            >
            <Button @click="generateQRCode">Generate QR Code</Button>
          </div>
        </div>
        <div>
          <CardTitle>Edit Surat</CardTitle>
          <CardDescription
            >Edit surat menggunakan formulir di bawah ini.</CardDescription
          >
        </div>
      </CardHeader>

      <form @submit.prevent="submitForm" class="space-y-4">
        <Card class="max-w-6xl mx-auto pl-6 pr-6 rounded-md">
          <CardHeader>
            <CardTitle>Surat</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              v-if="isLoading"
              v-for="index in 2"
              :key="index"
              class="flex space-x-4"
            >
              <FormLoading />
              <FormLoading />
            </div>
            <div v-if="isLoading" class="flex space-x-4">
              <FormLoading :isIcon="true" />
            </div>

            <div v-if="!isLoading" class="flex space-x-4">
              <div class="mb-4 flex-1 flex flex-col space-y-1.5">
                <Label for="template"
                  >Template
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Select
                  v-model="form.template"
                  :disabled="isFormDisabled"
                  required
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Pilih template surat" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Naskah Dinas Arahan</SelectLabel>
                      <SelectItem value="perintah">Surat Perintah</SelectItem>
                      <SelectItem value="tugas">Surat Tugas</SelectItem>
                      <SelectItem value="perjalanan_dinas"
                        >Surat Perjalanan Dinas</SelectItem
                      >
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Naskah Dinas Korespondensi</SelectLabel>
                      <SelectItem value="nota_dinas">Nota Dinas</SelectItem>
                      <SelectItem value="memo">Memo</SelectItem>
                      <SelectItem value="disposisi">Disposisi</SelectItem>
                      <SelectItem value="dinas_kepala_daerah"
                        >Surat Dinas yang ditanda tangani Kepala Daerah
                      </SelectItem>
                      <SelectItem value="dinas_perangkat_daerah"
                        >Surat Dinas yang ditanda tangani Perangkat Daerah
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Naskah Dinas Khusus</SelectLabel>
                      <SelectItem value="instruksi">Instruksi</SelectItem>
                      <SelectItem value="edaran">Surat Edaran</SelectItem>
                      <SelectItem value="kuasa">Surat Kuasa</SelectItem>
                      <SelectItem value="berita_acara">Berita Acara</SelectItem>
                      <SelectItem value="keterangan"
                        >Surat Keterangan</SelectItem
                      >
                      <SelectItem value="pengantar">Surat Pengantar</SelectItem>
                      <SelectItem value="pengumuman">Pengumuman</SelectItem>
                      <SelectItem value="laporan">Laporan</SelectItem>
                      <SelectItem value="telaahan_staff"
                        >Telaahan Staff</SelectItem
                      >
                      <SelectItem value="notula">Notula</SelectItem>
                      <SelectItem value="undangan">Surat Undangan</SelectItem>
                      <SelectItem value="pernyataan_melaksanakan_tugas"
                        >Surat Pernyataan Melaksanakan Tugas</SelectItem
                      >
                      <SelectItem value="panggilan">Surat Panggilan</SelectItem>
                      <SelectItem value="izin_kepala_daerah"
                        >Surat Izin Format yang ditanda tangani Kepala Daerah
                      </SelectItem>
                      <SelectItem value="izin_perangkat_daerah"
                        >Surat Izin Format yang ditanda tangani Perangkat Daerah
                      </SelectItem>
                      <SelectItem value="lembaran_daerah"
                        >Lembaran Daerah</SelectItem
                      >
                      <SelectItem value="berita_daerah"
                        >Berita Daerah</SelectItem
                      >
                      <SelectItem value="rekomendasi">Rekomendasi</SelectItem>
                      <SelectItem value="radiogram">Radiogram</SelectItem>
                      <SelectItem value="sttp"
                        >Surat Tanda Tamat Pendidikan dan Pelatihan
                        (STTP)</SelectItem
                      >
                      <SelectItem value="sertifikat">Sertifikat</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p v-if="errors.template" class="text-red-500 text-sm">
                  {{ errors.template }}
                </p>
              </div>

              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for="tembusan">Tembusan </Label>
                <Popover v-model:open="openTembusan">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :disabled="isFormDisabled"
                      :aria-expanded="openTembusan"
                      class="justify-between"
                    >
                      <h4 class="capitalize">
                        {{
                          users.tembusan.find(
                            (u) => u.id.toString() === form.tembusan
                          )?.name || "Pilih tembusan"
                        }}
                        <span class="capitalize">
                          {{ form.tembusan && " -" }}
                          {{
                            users.tembusan.find(
                              (u) => u.id.toString() === form.tembusan
                            )?.roles || ""
                          }}
                        </span>
                      </h4>
                      <Icon
                        :name="
                          openTembusan
                            ? 'tabler:chevron-up'
                            : 'tabler:chevron-down'
                        "
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Cari User..." />
                      <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="item in users.tembusan"
                            :key="item.name + '-' + item.roles"
                            :value="item.name + '-' + item.roles"
                            class="flex gap-1"
                            @select="
                              (ev) => {
                                let [selectedName] = ev.detail.value.split('-');
                                let value = users.tembusan.find(
                                  (u) => u.name === selectedName
                                )?.id;
                                if (value !== undefined) {
                                  form.tembusan = value;
                                }
                                openTembusan = false;
                              }
                            "
                          >
                            <span class="capitalize">{{ item.name }}</span> -
                            <span class="capitalize">{{ item.roles }}</span>
                            <Icon
                              name="ic:round-check"
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  item.id === form.tembusan
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div v-if="!isLoading" class="flex space-x-4">
              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for="penerima"
                  >Penerima
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Popover v-model:open="openPenerima">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :aria-expanded="openPenerima"
                      :disabled="isFormDisabled"
                      class="justify-between"
                    >
                      <h4 class="">
                        {{
                          users.penerima.find((u) => u.id === form.penerima)
                            ?.name || "Pilih penerima"
                        }}
                        <span class="capitalize">
                          {{ form.penerima && " -" }}
                          {{
                            users.penerima.find((u) => u.id === form.penerima)
                              ?.roles || ""
                          }}
                        </span>
                      </h4>
                      <Icon
                        :name="
                          openPenerima
                            ? 'tabler:chevron-up'
                            : 'tabler:chevron-down'
                        "
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Cari user..." />
                      <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="item in users.penerima"
                            :key="item.name + '-' + item.roles"
                            :value="item.name + '-' + item.roles"
                            class="flex gap-1"
                            @select="
                              (ev) => {
                                let [selectedName] = ev.detail.value.split('-');
                                let value = users.penerima.find(
                                  (u) => u.name === selectedName
                                )?.id;
                                if (value !== undefined) {
                                  form.penerima = value;
                                }
                                openPenerima = false;
                              }
                            "
                          >
                            <span class="capitalize">{{ item.name }}</span> -
                            <span class="capitalize">{{ item.roles }}</span>
                            <Icon
                              name="ic:round-check"
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  item.id === form.penerima
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p v-if="errors.penerima" class="text-red-500 text-sm">
                  {{ errors.penerima }}
                </p>
              </div>
              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for=""
                  >Deskripsi <span class="text-red-500" v-if="!isFormDisabled">*</span></Label
                >
                <Input
                  v-model="form.deskripsi"
                  :disabled="isFormDisabled"
                  id="deskripsi"
                  placeholder="Masukkan deskripsi"
                  required
                />
                <p v-if="errors.deskripsi" class="text-red-500 text-sm">
                  {{ errors.deskripsi }}
                </p>
              </div>
            </div>
            <div v-if="!isLoading" class="flex space-x-4 mt-4">
              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for="">Lampiran </Label>
                <div class="flex items-center gap-2">
                  <Input
                    v-model="form.lampiran"
                    :disabled="isFormDisabled"
                    id="lampiran"
                    placeholder="Masukkan lampiran"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button variant="ghost">
                          <Icon
                            name="material-symbols-light:info-outline"
                            class="cursor-pointer"
                            size="20"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Tambahkan tautan pendukung yang relevan untuk surat
                          ini.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card class="max-w-6xl mx-auto pl-6 pr-6 mt-6 rounded-md">
          <CardHeader>
            <CardTitle>Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              v-if="isLoading"
              v-for="index in 3"
              :key="index"
              class="mb-4 flex flex-col space-y-1.5"
            >
              <FormLoading />
            </div>

            <div v-if="!isLoading" class="mb-4 flex flex-col space-y-1.5">
              <Label for="approval_method"
                >Approval Method
                <span class="text-red-500" v-if="!isFormDisabled"
                  >*</span
                ></Label
              >
              <Select
                v-model="approvalMethod"
                :disabled="isApprovalMethodDisabled || isFormDisabled"
                required
              >
                <SelectTrigger id="approval_method">
                  <SelectValue placeholder="Pilih metode approval" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="no_wa">Nomor Telepon/WA</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.approvalMethod" class="text-red-500 text-sm">
                {{ errors.approvalMethod }}
              </p>
            </div>

            <div v-if="approvalMethod === 'web' && !isLoading">
              <div class="mb-4 flex flex-col space-y-1.5">
                <Label for="type_approval"
                  >Tipe Approval
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Select
                  v-model="form.type_approval"
                  :disabled="isTypeApprovalDisabled || isFormDisabled"
                  required
                >
                  <SelectTrigger id="type_approval">
                    <SelectValue placeholder="Pilih tipe approval" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="paralel">Paralel</SelectItem>
                    <SelectItem value="paralel_berurut"
                      >Paralel Berurut</SelectItem
                    >
                  </SelectContent>
                </Select>
                <p v-if="errors.type_approval" class="text-red-500 text-sm">
                  {{ errors.type_approval }}
                </p>
              </div>

              <div class="flex flex-col space-y-1.5">
                <Label for="user_approval"
                  >User Approval
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <div class="flex space-x-2">
                  <Popover v-model:open="openPersetujuan">
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        role="combobox"
                        :disabled="isInputDisabled || isTemplateDisabled"
                        :aria-expanded="openPersetujuan"
                        class="justify-between w-full disabled:cursor-not-allowed"
                      >
                        <h4>
                          {{
                            users.persetujuan.find((u) => u.id === selectedUser)
                              ?.name || "Pilih user approval"
                          }}
                          <span class="capitalize">
                            {{ selectedUser && " -" }}
                            {{
                              users.persetujuan.find(
                                (u) => u.id === selectedUser
                              )?.roles || ""
                            }}
                          </span>
                        </h4>
                        <Icon
                          :name="
                            openPersetujuan
                              ? 'tabler:chevron-up'
                              : 'tabler:chevron-down'
                          "
                          class="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="p-0">
                      <Command>
                        <CommandInput class="h-9" placeholder="Cari User..." />
                        <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              v-for="item in users.persetujuan"
                              :key="item.name + '-' + item.roles"
                              :value="item.name + '-' + item.roles"
                              class="flex gap-1"
                              @select="
                                (ev) => {
                                  let [selectedName] =
                                    ev.detail.value.split('-');
                                  let value = users.persetujuan.find(
                                    (u) => u.name === selectedName
                                  )?.id;
                                  if (value !== undefined) {
                                    selectedUser = value;
                                  }
                                  openPersetujuan = false;
                                }
                              "
                            >
                              <span class="capitalize">{{ item.name }}</span> -
                              <span class="capitalize">{{ item.roles }}</span>
                              <Icon
                                name="ic:round-check"
                                :class="
                                  cn(
                                    'ml-auto h-4 w-4',
                                    item.id === selectedUser
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )
                                "
                              />
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      (form.type_approval !== 'single' ||
                        form.user_id.length === 0)
                    "
                    class="self-end"
                    type="button"
                    @click="addUser"
                  >
                    <Icon
                      name="material-symbols:add-circle-rounded"
                      class="text-xl"
                    />
                  </Button>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      form.user_id.length > 0 &&
                      form.type_approval !== 'single'
                    "
                    type="button"
                    variant="destructive"
                    @click="removeAllUsers"
                  >
                    <Icon
                      name="material-symbols:delete-forever"
                      class="text-xl"
                    />
                  </Button>
                </div>
                <div v-if="errors.user_id" class="text-red-500 text-sm">
                  {{ errors.user_id }}
                </div>
                <ul>
                  <li
                    v-for="(userId, index) in form.user_id"
                    :key="userId"
                    class="flex items-center mt-2 justify-between"
                  >
                    <div class="flex items-center gap-x-2">
                      <span class="capitalize">{{ getUserName(userId) }}</span>
                      <div v-if="status !== 'draft' && status !== 'ditolak'">
                        <span
                          v-if="is_read && is_read[index] === '1'"
                          class="text-green-500"
                          >(Sudah Dibaca)</span
                        >
                        <span
                          v-else-if="is_read && is_read[index] === '0'"
                          class="text-red-500"
                          >(Belum Dibaca)</span
                        >
                      </div>
                    </div>
                    <Button
                      v-if="!isTemplateDisabled && !isFormDisabled"
                      type="button"
                      variant="destructive"
                      @click="removeUser(userId)"
                    >
                      <Icon
                        name="material-symbols:delete-forever"
                        class="text-xl"
                      />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="approvalMethod === 'no_wa' && !isLoading">
              <div class="mb-4 flex flex-col space-y-1.5">
                <Label for="type_approval"
                  >Tipe Approval
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Select
                  v-model="form.type_approval"
                  :disabled="isTypeApprovalDisabled || isFormDisabled"
                  required
                >
                  <SelectTrigger id="type_approval">
                    <SelectValue placeholder="Pilih tipe approval" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="paralel">Paralel</SelectItem>
                    <SelectItem value="paralel_berurut">Paralel Berurut</SelectItem>
                  </SelectContent>
                </Select>
                <p v-if="errors.type_approval" class="text-red-500 text-sm">
                  {{ errors.type_approval }}
                </p>
              </div>

              <div class="flex flex-col space-y-1.5">
                <Label for="phone"
                  >Nomor Telepon User Approval<span
                    class="text-red-500"
                    v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <div class="flex space-x-2">
                  <Popover v-model:open="openPersetujuan">
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        role="combobox"
                        :disabled="isInputDisabled || isTemplateDisabled"
                        :aria-expanded="openPersetujuan"
                        class="justify-between w-full disabled:cursor-not-allowed"
                      >
                        <h4>
                          {{ selectedPhone || "Pilih nomor telepon approval" }}
                        </h4>
                        <Icon
                          :name="openPersetujuan ? 'tabler:chevron-up' : 'tabler:chevron-down'"
                          class="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="p-0">
                      <Command>
                        <CommandInput class="h-9" placeholder="Cari User..." />
                        <CommandEmpty>Nomor telepon tidak ditemukan.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              v-for="item in users.persetujuan"
                              :key="item.phone_number + '-' + item.roles"
                              :value="item.phone_number + '-' + item.roles"
                              class="flex gap-1"
                              @select="
                                (ev) => {
                                  let [selectedName, selectedRole] = ev.detail.value.split('-');
                                  let value = users.persetujuan.find(u => u.phone_number === selectedName)?.id;
                                  if (value !== undefined) {
                                    selectedPhone = selectedName;
                                    selectedRole = selectedRole.trim();
                                  }
                                  openPersetujuan = false;
                                }
                              "
                            >
                              <span>{{ item.phone_number }}</span> -
                              <span class="">{{ item.roles }}</span>
                              <Icon
                                name="ic:round-check"
                                :class="cn('ml-auto h-4 w-4', item.phone_number === selectedPhone ? 'opacity-100' : 'opacity-0')"
                              />
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      (form.type_approval !== 'single' ||
                        form.phone.length === 0)
                    "
                    class="self-end"
                    type="button"
                    @click="addPhone"
                  >
                    <Icon
                      name="material-symbols:add-circle-rounded"
                      class="text-xl"
                    />
                  </Button>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      form.phone.length > 0 &&
                      form.type_approval !== 'single'
                    "
                    type="button"
                    variant="destructive"
                    @click="removeAllPhones"
                  >
                    <Icon
                      name="material-symbols:delete-forever"
                      class="text-xl"
                    />
                  </Button>
                </div>
                <div v-if="errors.phone" class="text-red-500 text-sm">
                  {{ errors.phone }}
                </div>
                <ul>
                  <li
                    v-for="(phone2, index) in form.phone"
                    :key="phone2"
                    class="flex items-center justify-between mt-2"
                  >
                    <div class="flex items-center gap-x-2">
                      <span>{{ getRolePhone(phone2) }}</span>
                      <div v-if="status !== 'draft' && status !== 'ditolak'">
                        <span
                          v-if="is_read && is_read[index] === '1'"
                          class="text-green-500"
                          >(Sudah Dibaca)</span
                        >
                        <span
                          v-else-if="is_read && is_read[index] === '0'"
                          class="text-red-500"
                          >(Belum Dibaca)</span
                        >
                      </div>
                    </div>
                    <Button
                      v-if="!isTemplateDisabled && !isFormDisabled"
                      type="button"
                      variant="destructive"
                      @click="removePhone(phone2)"
                    >
                      <Icon
                        name="material-symbols:delete-forever"
                        class="text-xl"
                      />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="approvalMethod === 'email' && !isLoading">
              <div class="mb-4 flex flex-col space-y-1.5">
                <Label for="type_approval"
                  >Tipe Approval
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Select
                  v-model="form.type_approval"
                  :disabled="isTypeApprovalDisabled || isFormDisabled"
                  required
                >
                  <SelectTrigger id="type_approval">
                    <SelectValue placeholder="Pilih tipe approval" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="paralel">Paralel</SelectItem>
                    <SelectItem value="paralel_berurut">Paralel Berurut</SelectItem>
                  </SelectContent>
                </Select>
                <p
                  v-if="errors.type_approval"
                  class="text-red-500 text-sm text-sm"
                >
                  {{ errors.type_approval }}
                </p>
              </div>

              <div class="flex flex-col space-y-1.5">
                <Label for="email"
                  >Email User Approval<span
                    class="text-red-500"
                    v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <div class="flex space-x-2">
                  <Popover v-model:open="openPersetujuan">
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        role="combobox"
                        :disabled="isInputDisabled || isTemplateDisabled"
                        :aria-expanded="openPersetujuan"
                        class="justify-between w-full disabled:cursor-not-allowed"
                      >
                        <h4>
                          {{ selectedEmail || "Pilih email approval" }}
                        </h4>
                        <Icon
                          :name="openPersetujuan ? 'tabler:chevron-up' : 'tabler:chevron-down'"
                          class="ml-2 h-4 w-4 shrink-0 opacity-50"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="p-0">
                      <Command>
                        <CommandInput class="h-9" placeholder="Cari User..." />
                        <CommandEmpty>Email tidak ditemukan.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              v-for="item in users.persetujuan"
                              :key="item.email + '-' + item.roles"
                              :value="item.email + '-' + item.roles"
                              class="flex gap-1"
                              @select="
                                (ev) => {
                                  let [selectedName, selectedRole] = ev.detail.value.split('-');
                                  let value = users.persetujuan.find(u => u.email === selectedName)?.id;
                                  if (value !== undefined) {
                                    selectedEmail = selectedName;
                                    selectedRole = selectedRole.trim();
                                  }
                                  openPersetujuan = false;
                                }
                              "
                            >
                              <span>{{ item.email }}</span> -
                              <span class="">{{ item.roles }}</span>
                              <Icon
                                name="ic:round-check"
                                :class="cn('ml-auto h-4 w-4', item.email === selectedEmail ? 'opacity-100' : 'opacity-0')"
                              />
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      (form.type_approval !== 'single' ||
                        form.email.length === 0)
                    "
                    class="self-end"
                    type="button"
                    @click="addEmail"
                  >
                    <Icon
                      name="material-symbols:add-circle-rounded"
                      class="text-xl"
                    />
                  </Button>
                  <Button
                    v-if="
                      !isTemplateDisabled &&
                      !isFormDisabled &&
                      form.email.length > 0 &&
                      form.type_approval !== 'single'
                    "
                    type="button"
                    variant="destructive"
                    @click="removeAllEmails"
                  >
                    <Icon
                      name="material-symbols:delete-forever"
                      class="text-xl"
                    />
                  </Button>
                </div>
                <div v-if="errors.email" class="text-red-500 text-sm">
                  {{ errors.email }}
                </div>
                <ul>
                  <li
                    v-for="(email2, index) in form.email"
                    :key="email2"
                    class="flex items-center justify-between mt-2"
                  >
                    <div class="flex items-center gap-x-2">
                      <span>{{ getRoleEmail(email2) }}</span>
                      <div v-if="status !== 'draft' && status !== 'ditolak'">
                        <span
                          v-if="is_read && is_read[index] === '1'"
                          class="text-green-500"
                          >(Sudah Dibaca)</span
                        >
                        <span
                          v-else-if="is_read && is_read[index] === '0'"
                          class="text-red-500"
                          >(Belum Dibaca)</span
                        >
                      </div>
                    </div>
                    <Button
                      v-if="!isTemplateDisabled && !isFormDisabled"
                      type="button"
                      variant="destructive"
                      @click="removeEmail(email2)"
                    >
                      <Icon
                        name="material-symbols:delete-forever"
                        class="text-xl"
                      />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="max-w-6xl mx-auto pl-6 pr-6 mt-6 rounded-md">
          <CardHeader>
            <CardTitle>Tanda Tangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="isLoading" class="flex space-x-4">
              <FormLoading />
              <FormLoading />
            </div>

            <div v-if="!isLoading" class="flex space-x-4">
              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for="signature"
                  >Tanda Tangan
                  <span class="text-red-500" v-if="!isFormDisabled"
                    >*</span
                  ></Label
                >
                <Popover v-model:open="openTandatangan">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :disabled="isFormDisabled"
                      :aria-expanded="openTandatangan"
                      class="justify-between"
                    >
                      <h4 class="">
                        {{
                          users.tandatangan.find((u) => u.id === form.signature)
                            ?.name ||
                          "Harap pilih tanda tangan dari daftar berikut"
                        }}
                        <span class="capitalize">
                          {{ form.signature && " -" }}
                          {{
                            users.tandatangan.find(
                              (u) => u.id === form.signature
                            )?.roles || ""
                          }}
                        </span>
                      </h4>
                      <Icon
                        :name="
                          openTandatangan
                            ? 'tabler:chevron-up'
                            : 'tabler:chevron-down'
                        "
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Cari User..." />
                      <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="item in users.tandatangan"
                            :key="item.name + '-' + item.roles"
                            :value="item.name + '-' + item.roles"
                            class="flex gap-1"
                            @select="
                              (ev) => {
                                let [selectedName] = ev.detail.value.split('-');
                                let value = users.tandatangan.find(
                                  (u) => u.name === selectedName
                                )?.id;
                                if (value !== undefined) {
                                  form.signature = value;
                                }
                                openTandatangan = false;
                              }
                            "
                          >
                            <span class="capitalize">{{ item.name }}</span> -
                            <span class="capitalize">{{ item.roles }}</span>
                            <Icon
                              name="ic:round-check"
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  item.id === form.signature
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p v-if="errors.signature" class="text-red-500 text-sm">
                  {{ errors.signature }}
                </p>
              </div>

              <div class="flex-1 flex flex-col space-y-1.5">
                <Label for="replacement_signature"
                  >Tanda Tangan Pengganti</Label
                >
                <Popover v-model:open="openReplacementSignature">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      :disabled="isFormDisabled"
                      :aria-expanded="openReplacementSignature"
                      class="justify-between"
                    >
                      <h4 class="">
                        {{
                          filterSignatures.find(
                            (u) => u.id === form.replacement_signature
                          )?.name ||
                          "Harap pilih tanda tangan pengganti dari daftar berikut"
                        }}
                        <span class="capitalize">
                          {{ form.replacement_signature && " -" }}
                          {{
                            filterSignatures.find(
                              (u) => u.id === form.replacement_signature
                            )?.roles || ""
                          }}
                        </span>
                      </h4>
                      <Icon
                        :name="
                          openReplacementSignature
                            ? 'tabler:chevron-up'
                            : 'tabler:chevron-down'
                        "
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="p-0">
                    <Command>
                      <CommandInput class="h-9" placeholder="Search user..." />
                      <CommandEmpty>User tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="item in filterSignatures"
                            :key="item.id"
                            :value="item.name + '-' + item.roles"
                            class="flex gap-1"
                            @select="
                              (ev) => {
                                let [selectedName] = ev.detail.value.split('-');
                                let value = filterSignatures.find(
                                  (u) => u.name === selectedName
                                )?.id;
                                if (value !== undefined) {
                                  form.replacement_signature = value;
                                }
                                openReplacementSignature = false;
                              }
                            "
                          >
                            <span class="capitalize">{{ item.name }}</span> -
                            <span class="capitalize">{{ item.roles }}</span>
                            <Icon
                              name="ic:round-check"
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                  item.id === form.replacement_signature
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )
                              "
                            />
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
      <CardFooter class="ml-4 mr-4 flex justify-end mt-6">
        <Button v-if="!isFormDisabled" type="submit" @click="submitForm"
          >Simpan Perubahan</Button
        >
        <div
          v-if="status === 'draft' || status === 'ditolak'"
          class="space-x-4"
        >
          <template v-if="isLocked">
            <button
              @click="toggleLock"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md ml-3"
            >
              <Icon name="material-symbols:lock-open-right-rounded" /> Kunci
            </button>
          </template>
          <template v-else>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <button
                  class="bg-primary text-white font-semibold py-2 px-4 pt-1 pb-2 rounded"
                >
                  Kirim ke Approval
                  <icon
                    name="material-symbols:send-outline-rounded"
                    class="-rotate-45"
                    size="22"
                  />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Kirim Surat ke Approval?</AlertDialogTitle>
                  <AlertDialogDescription
                    >Setelah surat terkirim tidak dapat dirubah atau diedit,
                    kecuali surat ditolak oleh approval</AlertDialogDescription
                  >
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    @click="updateStatus('menunggu_persetujuan')"
                    >Kirim</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <button
              @click="toggleLock"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              <Icon name="material-symbols:lock-open-rounded" />
            </button>
          </template>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
