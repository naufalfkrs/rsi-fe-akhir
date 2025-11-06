<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="mb-4 text-foreground flex items-center gap-3">
        <div
          class="text-purple-600 bg-purple-200 p-2 flex justify-center items-center rounded-sm"
        >
          <Icon name="mdi:file-document" class="w-10 h-10" />
        </div>
        <div>
          <h1 class="text-3xl font-bold">Daftar Surat</h1>
          <p class="text-neutral-500">Berisi daftar semua surat</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-8">
      <searchInput v-model="searchQuery" placeholder="Cari surat..." />
      <div>
        <router-link
          to="/letter/add"
          v-if="letterContents.length !== 0"
          class="bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
        >
          Tambahkan Surat
          <Icon name="material-symbols:add" size="20" />
        </router-link>
      </div>
    </div>

    <div v-if="!loading" class="flex justify-end">
      <SearchInput v-model="searchQuery" />
    </div>
    <div class="mt-6">
      <div
        class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        <Table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader>
            <TableRow
              class="bg-purple-600 dark:bg-purple-700 hover:bg-purple-600 overflow-y-auto"
            >
              <TableHead
                class="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
              >
                Isi Surat
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Tanggal Dibuat
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Deskripsi
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Surat
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Tembusan
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Penerima
              </TableHead>
              <TableHead
                class="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Lampiran
              </TableHead>
              <TableHead
                class="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
              >
                Status
              </TableHead>
              <TableHead
                class="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
              >
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <TableRow
              v-if="!loading"
              v-for="letter in letterContents"
              :key="letter.id"
            >
              <TableCell class="px-2 py-4 whitespace-nowrap text-center">
                <NuxtLink
                  :to="getEditRoute(letter)"
                  class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <div v-if="letter.status === 'ditolak'">
                    <Button
                      class="border border-red-500 bg-red-200 text-red-500 hover:bg-red-300 py-2 px-4 rounded"
                    >
                      <p class="pl-1 pr-1">Revisi Surat</p>
                    </Button>
                  </div>
                  <div v-else>
                    <Button
                      class="border border-purple-500 bg-purple-100 py-2 px-4 rounded text-purple-500 hover:bg-purple-300"
                      >Konten Surat</Button
                    >
                  </div>
                </NuxtLink>
              </TableCell>
              <TableCell
                class="px-2 py-4 whitespace-nowrap max-w-52 truncate"
                >{{ formatDate(letter.created_at) }}</TableCell
              >
              <TableCell
                class="px-2 py-4 whitespace-nowrap truncate max-w-52 cursor-pointer"
                @click="showDescriptionDialog(letter.deskripsi)"
                v-if="letter.deskripsi.length > 21"
                >{{ letter.deskripsi }}</TableCell
              >
              <TableCell
                v-else
                class="px-2 py-4 whitespace-nowrap truncate max-w-52"
                >{{ letter.deskripsi }}</TableCell
              >
              <TableCell class="px-2 py-4 whitespace-nowrap">{{
                letter.template.replace(/_/g, " ")
              }}</TableCell>
              <TableCell class="px-2 py-4 max-w-44">{{
                letter.tembusan_name
              }}</TableCell>
              <TableCell class="px-2 py-4 max-w-44">{{
                letter.penerima_name
              }}</TableCell>
              <TableCell class="px-2 py-4 whitespace-nowrap">
                <a
                  v-if="letter.lampiran"
                  :href="letter.lampiran"
                  target="_blank"
                  class="bg-blue-200 hover:bg-blue-500 py-0.5 px-2.5 rounded border border-blue-500 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white transition duration-300"
                >
                  Lihat Lampiran
                </a>
              </TableCell>
              <TableCell
                :class="
                  cn(
                    'px-2 py-4 whitespace-nowrap text-left capitalize font-semibold'
                  )
                "
              >
                <div class="flex gap-4 whitespace-nowrap">
                  <span
                    :class="
                      cn(
                        'px-2.5 py-0.5 text-left rounded capitalize',
                        getStatusClass(letter.status)
                      )
                    "
                    >{{ letter.status.replace(/_/g, " ") }}</span
                  >
                  <p
                    v-show="letter.status === 'terkirim'"
                    :class="
                      cn(
                        'px-2.5 py-0.5 rounded',
                        letter.mark_as_read === 'sudah_dibaca'
                          ? 'bg-teal-600 text-teal-50'
                          : 'bg-rose-600 text-rose-50'
                      )
                    "
                  >
                    {{ letter.mark_as_read.replace(/_/g, " ") }}
                  </p>
                </div>
              </TableCell>
              <TableCell
                class="px-2 py-4 whitespace-nowrap flex justify-center"
              >
                <div
                  v-if="
                    letter.status === 'disetujui' ||
                    letter.status === 'menunggu_persetujuan' ||
                    letter.status === 'menunggu_tanda_tangan'
                  "
                  class="flex"
                >
                  <router-link
                    :to="getEditLetter(letter.id)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 m-2"
                  >
                    <Icon
                      name="material-symbols:edit-square-outline-rounded"
                      class="text-xl"
                    />
                  </router-link>
                </div>
                <div v-else-if="letter.status === 'terkirim'" class="flex">
                  <router-link
                    :to="getEditLetter(letter.id)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 m-2"
                  >
                    <Icon
                      name="material-symbols:visibility-outline-rounded"
                      class="text-xl"
                    />
                  </router-link>
                </div>
                <div v-else class="flex">
                  <NuxtLink
                    v-if="permissions.includes('letter.update')"
                    :to="getEditLetter(letter.id)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 m-2"
                  >
                    <Icon
                      name="material-symbols:edit-square-outline-rounded"
                      class="text-xl"
                    />
                  </NuxtLink>
                  <AlertDialog v-if="permissions.includes('letter.delete')">
                    <AlertDialogTrigger as-child>
                      <button
                        class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500"
                      >
                        <Icon
                          name="material-symbols:delete-forever-outline-rounded"
                          class="text-xl"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle
                          >Apakah Kamu Yakin Menghapus Surat
                          Ini?</AlertDialogTitle
                        >
                        <AlertDialogDescription>
                          Surat
                          <span class="font-bold text-red-600">{{
                            letter.deskripsi
                          }}</span>
                          tidak dapat di kembalikan, surat akan terhapus secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          @click="deleteLetter(letter.id)"
                          class="bg-red-600 hover:bg-red-700"
                          >Hapus</AlertDialogAction
                        >
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Dialog>
                  <DialogTrigger as-child>
                    <button
                      class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 m-2"
                    >
                      <Icon
                        name="material-symbols:calendar-clock-outline-rounded"
                        class="text-xl"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[1000px] max-w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>Timeline</DialogTitle>
                    </DialogHeader>
                    <div class="overflow-y-auto max-h-[400px]">
                      <Table
                        class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <TableHeader
                          class="bg-purple-600 dark:bg-purple-700 sticky top-0"
                        >
                          <TableRow class="hover:bg-purple-600">
                            <TableHead
                              class="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                              >From</TableHead
                            >
                            <TableHead
                              class="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                              >To</TableHead
                            >
                            <TableHead
                              class="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                              >Duration</TableHead
                            >
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow
                            v-for="(log, index) in getLogDurations(
                              letter.log_status,
                              letter.type_approval
                            )"
                            :key="index"
                          >
                            <TableCell class="px-4 py-3 text-left">
                              <span
                                :class="
                                  cn(
                                    'px-2.5 py-0.5 text-left rounded font-semibold',
                                    getStatusClass(log.statusFrom)
                                  )
                                "
                                >{{ log.statusFrom.replace(/_/g, " ") }}</span
                              >
                            </TableCell>
                            <TableCell class="px-4 py-3 text-left">
                              <span
                                :class="
                                  cn(
                                    'px-2.5 py-0.5 text-left rounded font-semibold',
                                    getStatusClass(log.statusTo)
                                  )
                                "
                                >{{ log.statusTo.replace(/_/g, " ") }}</span
                              >
                            </TableCell>
                            <TableCell class="px-4 py-3 text-left text-base">{{
                              log.duration
                            }}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
            <LoadingTable v-else :row="5" :cell="9" />
          </TableBody>
        </Table>
        <div
          v-if="letterContents.length === 0 && !loading"
          class="text-gray-600 dark:text-gray-400 flex flex-col items-center justify-center gap-4 h-96"
        >
          <div class="flex items-center gap-2">
            Tidak ada Surat.
            <Icon name="ic:outline-inbox" size="20" />
          </div>

          <NuxtLink
            v-if="letterContents.length === 0"
            to="/letter/add"
            class="border border-purple-700 text-foreground font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center gap-2"
          >
            Tambahkan Surat
            <Icon name="material-symbols:add" size="20" />
          </NuxtLink>
        </div>
        <div class="mx-auto py-2 w-1/2 flex justify-center">
          <Pagination
            v-slot="{ page }"
            :total="totalLetters"
            :sibling-count="1"
            show-edges
            :default-page="currentPage"
            @update:page="handlePageChange"
          >
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />
              <template v-for="(item, index) in items" :key="index">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="w-10 h-10 p-0"
                    :variant="item.value === page ? 'default' : 'outline'"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :index="index" />
              </template>
              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </div>
    <Dialog v-model:open="showDialog">
      <DialogTrigger as-child> </DialogTrigger>
      <DialogContent
        class="max-w-4xl max-h-[80vh] break-all p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <DialogHeader>
          <DialogTitle class="text-lg font-semibold"
            >Deskripsi Lengkap</DialogTitle
          >
        </DialogHeader>
        <p class="text-gray-800 dark:text-gray-300">
          {{ selectedDescription }}
        </p>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import { watch, ref, onMounted } from "vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "vue-toastification";
import searchInput from "../../components/reusesable/searchInput.vue";
import { Button } from "@/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

const loading = ref(true);
const letterContents = ref<any[]>([]);
const searchQuery = ref("");
const currentPage = ref(1);
const totalLetters = ref(0);
const { $api } = useNuxtApp();
const { permissions } = useAuthStore();
const toast = useToast();

const fetchLetterContents = async () => {
  loading.value = true;
  try {
    const { data } = await $api.get("/v1/letter/getid", {
      params: { search: searchQuery.value, page: currentPage.value },
    });
    if (data.data) {
      letterContents.value = data.data.list || [];
      totalLetters.value = data.data.meta.total;
    }
  } catch (error) {
    console.error("Error fetching letter contents:", error);
  } finally {
    loading.value = false;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "draft":
      return "bg-blue-100 text-blue-800 capitalize";
    case "menunggu_persetujuan":
      return "bg-yellow-100 text-yellow-800 capitalize";
    case "terkirim":
      return "bg-green-100 text-green-800 capitalize";
    case "ditolak":
      return "bg-red-100 text-red-800 capitalize";
    case "menunggu_tanda_tangan":
      return "bg-gray-300 text-gray-800 capitalize";
    case "disetujui":
      return "bg-purple-200 text-purple-800 capitalize";
    default:
      return "border border-gray-500 text-gray-800 dark:border-white dark:text-gray-800 dark:bg-white";
  }
};

const getLogDurations = (logStatus, type) => {
  const durations = [];
  const now = new Date();

  let waitingApprovalToRejected = null;
  let waitingApprovalToSignature = null;

  for (let i = 0; i < logStatus.length; i++) {
    const current = logStatus[i];
    const next = logStatus[i + 1];
    const currentDate = new Date(current.created_at);

    if (next) {
      const nextDate = new Date(next.created_at);
      const duration = getDuration(currentDate, nextDate);

      if (
        current.log_status === "menunggu_persetujuan" &&
        next.log_status !== "ditolak"
      ) {
        waitingApprovalToRejected = {
          statusFrom: "menunggu_persetujuan",
          statusTo: "ditolak",
          startTime: currentDate,
          duration: null,
        };
      }

      if (
        current.log_status === "menunggu_persetujuan" &&
        next.log_status !== "menunggu_tanda_tangan"
      ) {
        waitingApprovalToSignature = {
          statusFrom: "menunggu_persetujuan",
          statusTo: "menunggu_tanda_tangan",
          startTime: currentDate,
          duration: null,
        };
      }

      if (
        !(
          current.log_status === "menunggu_tanda_tangan" &&
          next.log_status === "menunggu_tanda_tangan"
        ) &&
        next.log_status !== "menunggu_tanda_tangan" &&
        next.log_status !== "ditolak"
      ) {
        durations.push({
          statusFrom: current.log_status,
          statusTo: next.log_status,
          duration: duration,
        });
      }
    } else if (current.log_status !== "terkirim") {
      const duration = getDuration(currentDate, now);
      durations.push({
        statusFrom: current.log_status,
        statusTo: "Sekarang",
        duration: duration,
      });
    }

    if (waitingApprovalToRejected && next && next.log_status === "ditolak") {
      waitingApprovalToRejected.duration = getDuration(
        waitingApprovalToRejected.startTime,
        new Date(next.created_at)
      );
      durations.push(waitingApprovalToRejected);
      waitingApprovalToRejected = null;
    }

    if (
      waitingApprovalToSignature &&
      next &&
      next.log_status === "menunggu_tanda_tangan"
    ) {
      waitingApprovalToSignature.duration = getDuration(
        waitingApprovalToSignature.startTime,
        new Date(next.created_at)
      );
      durations.push(waitingApprovalToSignature);
      waitingApprovalToSignature = null;
    }
  }

  return durations;
};

const getDuration = (fromTime, toTime) => {
  const diffInSeconds = Math.floor((toTime - fromTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const seconds = diffInSeconds % 60;
  const minutes = diffInMinutes % 60;
  const hours = diffInHours;

  if (hours > 0) {
    return `${hours} jam ${minutes} menit`;
  } else if (minutes > 0) {
    return `${minutes} menit ${seconds} detik`;
  } else {
    return `${seconds} detik`;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchLetterContents();
};

const getEditRoute = (letter: any) => {
  return `/docs/${letter.template}/${letter.id}`;
};

const getEditLetter = (id: any) => {
  return `/letter/edit/${id}`;
};

const formattedTemplateName = (template: any) => {
  return template.replace(/_/g, " ");
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const deleteLetter = async (id: any) => {
  try {
    await $api.delete(`/v1/letter/${id}`);
    letterContents.value = letterContents.value.filter(
      (letter) => letter.id !== id
    );
    toast.success("Surat berhasil dihapus!");
  } catch (error) {
    toast.error("Terjadi kesalahan saat menghapus surat");
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const debouncedFetch = debounce(fetchLetterContents, 500);

watch(searchQuery, () => {
  debouncedFetch();
});

onMounted(async () => {
  await fetchLetterContents();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permission"],
});

const showDialog = ref(false);
const selectedDescription = ref("");

const showDescriptionDialog = (description) => {
  selectedDescription.value = description;
  showDialog.value = true;
};
</script>
