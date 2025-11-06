<template>
  <div>
    <div class="mt-6">
      <div
        class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        <Table class="min-w-full divide-gray-200 dark:divide-gray-700">
          <TableHeader>
            <TableRow
              class="bg-purple-600 dark:bg-purple-700 hover:bg-purple-600 overflow-y-auto"
            >
              <TableHead
                class="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Deskripsi</TableHead
              >
              <TableHead
                class="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Surat</TableHead
              >
              <TableHead
                class="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Pembuat</TableHead
              >
              <TableHead
                class="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Tanggal Dibuat</TableHead
              >
              <TableHead
                class="px-6 py-3 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Lampiran</TableHead
              >
              <TableHead
                class="px-6 py-3 text-center text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
              >
                Aksi</TableHead
              >
            </TableRow>
          </TableHeader>
          <TableBody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <TableRow
              v-if="!loading"
              v-for="surat in formattedSurat"
              :key="surat.id"
            >
              <TableCell
                class="px-6 py-4 whitespace-nowrap truncate max-w-52 cursor-pointer"
                @click="showDescriptionDialog(surat.deskripsi)"
                v-if="surat.deskripsi.length > 21"
                >{{ surat.deskripsi }}</TableCell
              >
              <TableCell
                v-else
                class="px-6 py-4 whitespace-nowrap truncate max-w-52"
                >{{ surat.deskripsi }}</TableCell
              >
              <TableCell class="px-6 py-4 whitespace-nowrap">{{
                surat.template.replace(/_/g, " ")
              }}</TableCell>
              <TableCell class="px-6 py-4 whitespace-nowrap"
                >{{ surat.pembuat }}
              </TableCell>
              <TableCell class="px-6 py-4 whitespace-nowrap"
                >{{ formatDate(surat.created_at) }}
              </TableCell>
              <TableCell class="px-6 py-4 whitespace-nowrap">
                <a
                  v-if="surat.lampiran"
                  :href="surat.lampiran"
                  target="_blank"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500"
                >
                  Lihat Lampiran
                </a>
              </TableCell>
              <TableCell
                class="px-6 py-4 whitespace-nowrap flex justify-center"
              >
                <NuxtLink
                  :to="getViewRoute(surat)"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500"
                >
                  <Icon
                    name="material-symbols:visibility-outline-rounded"
                    class="text-xl"
                  />
                </NuxtLink>
              </TableCell>
            </TableRow>
            <LoadingTable v-else :row="5" :cell="6" />
          </TableBody>
        </Table>

        <div
          v-if="tembusanSurat?.length === 0 && !loading"
          class="text-gray-600 dark:text-gray-400 flex flex-col items-center justify-center gap-4 h-96"
        >
          <div class="flex items-center gap-2">
            Tidak ada data.
            <Icon name="ic:outline-inbox" size="20" />
          </div>
        </div>
        <div class="mx-auto w-1/2 flex justify-center py-2">
          <Pagination
            v-slot="{ page }"
            :total="totalPages"
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

<script setup>
const props = defineProps({
  tembusanSurat: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);
const handlePageChange = (page) => {
  emit("page-change", page);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const getViewRoute = (letter) => {
  return `/dashboard/letter/view/${letter.template}/${letter.id}`;
};
const formattedSurat = computed(() => {
  return props.tembusanSurat.map((surat) => ({
    ...surat,
    formattedTemplate: surat.template.replace(/_/g, " "),
  }));
});

const showDialog = ref(false);
const selectedDescription = ref("");

const showDescriptionDialog = (description) => {
  selectedDescription.value = description;
  showDialog.value = true;
};
</script>
