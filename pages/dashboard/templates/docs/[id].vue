<template>
  <div>
    <div class="flex ml-32 justify-between mb-4 mt-10">
      <Button @click="goBack"><Icon name="material-symbols:arrow-back-rounded" size="25" class="bg-white" /></Button>
    </div>
    <component :is="component"></component>
  </div>
</template>

<script setup lang="ts">
import BeritaAcara from '~/components/templates/BeritaAcara.vue';
import Beritadaerah from '~/components/templates/BeritaDaerah.vue';
import Disposisi from '~/components/templates/Disposisi.vue';
import Instruksi from '~/components/templates/Instruksi.vue';
import Laporan from '~/components/templates/Laporan.vue';
import Memo from '~/components/templates/Memo.vue';
import NotaDinas from '~/components/templates/NotaDinas.vue';
import Pelaksanaantugas from '~/components/templates/pelaksanaantugas.vue';
import Pengantar from '~/components/templates/Pengantar.vue';
import Sertifikat from '~/components/templates/Sertifikat.vue';
import Sttp from '~/components/templates/Sttp.vue';
import SuratDinasKpd from '~/components/templates/SuratDinasKpd.vue';
import SuratDinasPrg from '~/components/templates/SuratDinasPrg.vue';
import SuratEdaran from '~/components/templates/SuratEdaran.vue';
import suratizin from '~/components/templates/SuratIzin.vue';
import SuratIzinPerangkat from '~/components/templates/SuratIzinPerangkat.vue';
import SuratKeterangan from '~/components/templates/SuratKeterangan.vue';
import SuratKuasa from '~/components/templates/SuratKuasa.vue';
import Suratlembarandaerah from '~/components/templates/SuratLembaranDaerah.vue';
import SuratNotula from '~/components/templates/SuratNotula.vue';
import Suratpanggilan from '~/components/templates/Suratpanggilan.vue';
import Suratpengumuman from '~/components/templates/SuratPengumuman.vue';
import SuratPerintah from '~/components/templates/SuratPerintah.vue';
import SuratPerjalananDinas from '~/components/templates/SuratPerjalananDinas.vue';
import Suratradiogram from '~/components/templates/SuratRadiogram.vue';
import Suratrekomendasi from '~/components/templates/SuratRekomendasi.vue';
import SuratTugas from '~/components/templates/SuratTugas.vue';
import SuratUndangan from '~/components/templates/SuratUndangan.vue';
import Telaahan from '~/components/templates/Telaahan.vue';
import { docs } from '~/data/docs';

type Document = {
  name: String;
  route: String;
};

type ComponentMap = {
  [key: `/${string}`]: any;
};

const route = useRoute();

const router = useRouter();

const document = computed<Document | any>(() =>
  docs.find((doc) => {
    return doc.route === `/${route.params.id}`;
  })
);

const goBack = () => {
  router.back();
};

const componentMap: ComponentMap = {
  '/surat-disposisi': Disposisi,
  '/surat-memo': Memo,
  '/surat-perintah': SuratPerintah,
  '/surat-intruksi': Instruksi,
  '/surat-nota-dinas': NotaDinas,
  '/surat-dinas-kepala-daerah': SuratDinasKpd,
  '/surat-dinas-perangkat-daerah': SuratDinasPrg,
  '/surat-keterangan': SuratKeterangan,
  '/surat-kuasa': SuratKuasa,
  '/surat-perjalanan-dinas': SuratPerjalananDinas,
  '/surat-tugas': SuratTugas,
  '/surat-edaran': SuratEdaran,
  '/surat-notula': SuratNotula,
  '/surat-undangan': SuratUndangan,
  '/surat-pelaksanaan-tugas': Pelaksanaantugas,
  '/surat-panggilan': Suratpanggilan,
  '/surat-izin': suratizin,
  '/surat-lembaran-daerah': Suratlembarandaerah,
  '/surat-berita-daerah': Beritadaerah,
  '/surat-rekomendasi': Suratrekomendasi,
  '/surat-radiogram': Suratradiogram,
  '/surat-pengumuman': Suratpengumuman,
  '/surat-sttp': Sttp,
  '/surat-sertifikat': Sertifikat,
  '/surat-berita-acara': BeritaAcara,
  '/surat-izin-perangkat-daerah': SuratIzinPerangkat,
  '/surat-telaahan-staff': Telaahan,
  '/surat-pengantar': Pengantar,
  '/surat-laporan': Laporan,
};

const component = computed(() => {
  if (!document) return 'div';
  return componentMap[document.value?.route] || 'div';
});
</script>
