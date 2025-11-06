<template>
  <div>
    <div v-if="isUserLoggedIn()">
      <Button @click="goBack()"
        ><Icon
          name="material-symbols:arrow-back-rounded"
          size="25"
          class="bg-white"
      /></Button>
    </div>
    <div
      v-if="isLoading"
      class="flex min-h-[80vh] w-full items-center justify-center"
    >
      <Skeleton class="w-2/4 mx-auto h-[80vh] bg-slate-300" />
    </div>
    <div
      v-else
      class="flex flex-col gap-10 overflow-hidden max-w-4xl mx-auto pb-20"
    >
      <div v-if="!Approved">
        <DynamicTemplateDisplay
          class="dynamic-template-container"
          :templateName="selectedTemplate"
          :formData="templateInput"
          :token="letterToken"
          :id="letterId"
          :image="templateAsset"
        />
        <DropdownMenu v-if="status === 'terkirim'">
          <DropdownMenuTrigger as-child>
            <Button> Download PDF </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56 mb-3">
            <DropdownMenuLabel>Download Option</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                @click="downloadPDFWithQR"
                class="hover:cursor-pointer mt-2"
              >
                <Icon
                  name="material-symbols:qr-code-rounded"
                  class="text-lg mr-2 text-green-600"
                />
                <span>Dengan QR Code</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="hideQr"
                class="hover:cursor-pointer mt-2"
              >
                <Icon
                  name="material-symbols:do-not-disturb-off-rounded"
                  class="text-lg mr-2 text-red-600"
                />
                <span>Tanpa QR Code</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          v-if="status === 'menunggu_tanda_tangan'"
          class="mt-4 max-w-xs space-y-4 mx-auto w-full"
        >
          <div v-if="is_sign === '0'">
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <button
                  class="bg-primary w-full text-white font-bold py-2 w-1/4 mx-auto px-4 rounded"
                >
                  Tanda tangani
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tanda Tangani Surat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Setelah ditanda tangani surat tidak dapat ditandatangani
                    ulang, Pastikan surat telah dibaca sebelum menandatanginya!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction @click="updateStatus('disetujui')"
                    >Tanda Tangan</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog v-if="replacement_signature !== null">
              <AlertDialogTrigger as-child>
                <button
                  class="border-primary border w-full text-primary font-bold mt-2 py-2 w-1/4 mx-auto px-4 rounded"
                >
                  Turunkan tanda tangan
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle
                    >Turunkan Tanda Tangan Surat?</AlertDialogTitle
                  >
                  <AlertDialogDescription>
                    Setelah tanda tangan diturunkan, surat sepenuhnya di
                    serahkan kepada approvel di bawah.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction @click="updateSign(1)"
                    >Turunkan Tanda Tangan</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <AlertDialog v-if="is_sign === '1'">
            <AlertDialogTrigger as-child>
              <button
                class="bg-primary w-full text-white font-bold py-2 w-1/4 mx-auto px-4 rounded"
              >
                Tanda tangani
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tanda Tangani Surat?</AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah ditanda tangani surat tidak dapat ditandatangani
                  ulang, Pastikan surat telah dibaca sebelum menandatanginya!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction @click="updateStatus('disetujui')"
                  >Tanda Tangani</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div></div>
        </div>

        <div
          v-if="status === 'menunggu_persetujuan'"
          class="mt-4 max-w-xs space-y-4 mx-auto w-full"
        >
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <button
                class="bg-primary w-full text-white font-bold py-3 px-4 rounded"
              >
                Setujui
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Setujui Surat Ini?</AlertDialogTitle>
                <AlertDialogDescription>
                  Setelah surat disetujui penyetujuan ulang tidak dapat
                  dilakukan, pastikan surat sudah benar sebelum menyetujuinya.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  @click="
                    isUserLoggedIn()
                      ? updateApprovalStatus(1)
                      : updateApprovalStatustk(1)
                  "
                  >Setujui</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger as-child>
              <button
                class="border-red-500 border w-full text-red-500 font-bold py-2 rounded"
              >
                Tidak setuju
              </button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tidak Setuju</DialogTitle>
              </DialogHeader>
              <DialogDescription
                >Masukan komentar mengapa surat tidak
                disetujui!</DialogDescription
              >
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Textarea
                    v-model="rejectComment"
                    class="col-span-4"
                    placeholder="Silakan isi komentar disini."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" @click="confirmReject()"> Kirim </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-col items-center">
          <img class="w-[400px]" src="/403.png" alt="" />
          <h1 class="text-3xl font-bold text-center">Tidak Ada Surat</h1>
          <p class="text-center mt-4">
            Surat ini sudah mendapatkan persetujuan
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Loader2 } from "lucide-vue-next";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import DynamicTemplateDisplay from "~/components/DynamicTemplateDisplay.vue";
definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const router = useRouter();
const toast = useToast();
const { $api } = useNuxtApp();
const { slug } = route.params;
const status = ref(null);
const replacement_signature = ref(null);
const is_sign = ref("");
const selectedTemplate = ref("");
const templateInput = ref({});
const templateAsset = ref("");
const isLoading = ref(true);
const token = useCookie("token");
const rejectComment = ref("");
const letterToken = ref("");
const letterId = ref("");
const Approved = ref(false);
const Deskripsi = ref("");
const Nomor_Surat = ref("");
const is_read = ref<any>("");
const mark_as_read = ref<any>("");

const isUserLoggedIn = () => {
  return token.value !== undefined;
};

const goBack = () => {
  router.go(-1);
};

watchEffect(() => {
  if (slug && slug.length > 0) {
    selectedTemplate.value = slug[0];
    letterId.value = slug[1];
  }
});

const fetchLetter = async () => {
  try {
    const { data } = await $api.get(`/v1/letter/content/${slug[1]}`);
    if (data.data) {
      Deskripsi.value = data?.data?.deskripsi || "";
      Nomor_Surat.value =
        data?.data?.exotic_property?.Nomor_surat ||
        data?.data?.exotic_property?.Nomor ||
        "";
      templateInput.value = data?.data?.exotic_property || {};
      templateAsset.value = data?.data?.assets?.storage_path;
      status.value = data?.data?.status;
      replacement_signature.value = data?.data?.replacement_signature || null;
      is_sign.value = data?.data?.is_sign;
      letterToken.value = data?.data?.token || "";
      is_read.value =
        data?.data?.is_reads === 1
          ? "read"
          : data?.data?.is_reads === 0
          ? "unread"
          : null;
      mark_as_read.value = data?.data?.mask_as_read;
    }
    isLoading.value = false;
  } catch (error) {
    templateInput.value = {};
    console.error("Error fetching letter content:", error);
  }
};

const fetchLettertk = async () => {
  try {
    const order = route.query.order;
    const { data } = await $api.get(`/v1/letter/content/token/${slug[1]}`, {
      params: { order: order },
    });
    if (data.data) {
      templateInput.value = data?.data?.exotic_property || {};
      templateAsset.value = data?.data?.assets?.storage_path;
      status.value = data?.data?.status;
      is_read.value = data?.data?.is_reads === 1 ? "read" : "unread";
    }
    isLoading.value = false;
  } catch (error) {
    templateInput.value = {};
    Approved.value = true;
    isLoading.value = false;
    console.error("Error fetching letter content:", error);
  }
};

const confirmReject = async () => {
  if (isUserLoggedIn()) {
    await updateApprovalStatus(0, rejectComment.value);
  } else {
    await updateApprovalStatustk(0, rejectComment.value);
  }
};

const updateApprovalStatus = async (isApprove, comment = "") => {
  try {
    const response = await $api.put(`/v1/letter/${slug[1]}/approval`, {
      is_approve: isApprove,
      comment: comment,
    });
    if (isApprove == 1) {
      toast.success("Berhasil menyetujui");
      router.push("/dashboard/approval");
    } else if (isApprove == 0) {
      toast.success("Berhasil menolak");
      router.push("/dashboard/approval");
    }
  } catch (error) {
    toast.error("An error occurred: " + error.response.data.error);
  }
};

const updateApprovalStatustk = async (isApprove, comment = "") => {
  const order = route.query.order;

  try {
    const response = await $api.put(
      `/v1/letter/${slug[1]}/approval/token`,
      {
        is_approve: isApprove,
        comment: comment,
      },
      {
        params: { order: order },
      }
    );
    if (isApprove == 1) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else if (isApprove == 0) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  } catch (error) {
    toast.error("An error occurred: " + error.response.data.error);
  }
};

const updateStatus = async (status) => {
  try {
    await $api.put(`/v1/letter/status/${slug[1]}`, {
      status: status,
    });
    toast.success("Berhasil menandatangani");
    router.push("/dashboard/tandatangan");
  } catch (error) {
    console.error("Error updating letter status:", error);
    toast.error("An error occurred while updating the letter status.");
  }
};

const updateSign = async (status) => {
  try {
    await $api.put(`/v1/letter/sign/${slug[1]}`, {
      is_sign: status,
    });
    toast.success("Berhasil menurunkan tanda tangan");
    router.push("/dashboard/tandatangan");
  } catch (error) {
    console.error("Error updating letter status:", error);
    toast.error("An error occurred while updating the letter status.");
  }
};

const QrCode = useQrStore();
const hideQr = async () => {
  QrCode.setMatchedQr(true);
  QrCode.toggleVisibility(false);
  setTimeout(async () => {
    await downloadPDF();
    QrCode.toggleVisibility(true);
  }, 1000);
};

const downloadPDFWithQR = async () => {
  await downloadPDF(true);
};
const downloadPDF = async () => {
  const element = document.querySelector(".dynamic-template-container");
  if (!element) return;

  const images = element.querySelectorAll("img");
  const loadPromises = Array.from(images).map((img) => {
    return new Promise<void>((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  });

  await Promise.all(loadPromises);

  const canvas = await html2canvas(element, {
    useCORS: true,
    logging: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
  });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${Nomor_Surat.value}_${Deskripsi.value}.pdf`);
};

const markAsRead = async () => {
  try {
    await $api.put(`/v1/letter/${slug[1]}/mark-as-read`);
  } catch (error) {
    console.error("Error updating letter status:", error);
  }
};

const markAsReadtk = async () => {
  try {
    await $api.put(`/v1/letter/${slug[1]}/mark-as-read/${route.query.order}`);
  } catch (error) {
    console.error("Error updating letter status:", error);
  }
};

const markAsReadFinal = async () => {
  try {
    await $api.patch(`/v1/letter/${slug[1]}/mark-as-read`);
  } catch (error) {
    console.error("Error updating letter status:", error);
  }
};

onMounted(() => {
  if (isUserLoggedIn()) {
    fetchLetter().then(() => {
      if (is_read.value === "unread" && status.value !== "terkirim") {
        markAsRead();
      }
      if (
        mark_as_read.value === "belum_dibaca" &&
        status.value === "terkirim"
      ) {
        markAsReadFinal();
      }
    });
  } else {
    fetchLettertk().then(() => {
      if (is_read.value === "unread") {
        markAsReadtk();
      }
    });
  }
});
</script>

<style scoped>
.scaled-wrapper {
  position: fixed;
  left: 50%;
  max-width: 1280px;
  margin-left: 20px;
}

.scaled-container {
  transform: scale(0.54);
  transform-origin: top;
  width: fit-content;
  height: fit-content;
}
</style>
