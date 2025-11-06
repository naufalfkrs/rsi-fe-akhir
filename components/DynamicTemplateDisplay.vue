<template>
  <component :is="templateComponent" :formData="formData" :token="token" :id="id" :image="image" />
</template>

<script setup lang="ts">
import SuratPerintah from '~/components/templates/SuratPerintah.vue';
import NotaDinas from '~/components/templates/NotaDinas.vue';
import Memo from '~/components/templates/Memo.vue';
import SuratEdaran from './templates/SuratEdaran.vue';
import SuratKuasa from './templates/SuratKuasa.vue';
import SuratKeterangan from './templates/SuratKeterangan.vue';
import SuratPengumuman from './templates/SuratPengumuman.vue';
import SuratNotula from './templates/SuratNotula.vue';
import SuratUndangan from './templates/SuratUndangan.vue';
import Pelaksanaantugas from './templates/pelaksanaantugas.vue';
import Suratpanggilan from './templates/Suratpanggilan.vue';
import SuratIzin from './templates/SuratIzin.vue';
import SuratIzinPerangkat from './templates/SuratIzinPerangkat.vue';
import SuratTugas from '~/components/templates/SuratTugas.vue';
import Instruksi from '~/components/templates/Instruksi.vue';
import Sertifikat from '~/components/templates/Sertifikat.vue';
import SuratDinasKpd from '~/components/templates/SuratDinasKpd.vue';
import SuratDinasPerangkatDaerah from '~/components/templates/SuratDinasPrg.vue';
import BeritaAcara from '~/components/templates/BeritaAcara.vue';
import Sttp from '~/components/templates/Sttp.vue';
import Telaahan from '~/components/templates/Telaahan.vue';
import Laporan from '~/components/templates/Laporan.vue';
import Pengantar from '~/components/templates/Pengantar.vue';
import BeritaDaerah from './templates/BeritaDaerah.vue';
import SuratRekomendasi from './templates/SuratRekomendasi.vue';
import SuratRadiogram from './templates/SuratRadiogram.vue';
import Disposisi from './templates/Disposisi.vue';
import SuratPerjalananDinas from './templates/SuratPerjalananDinas.vue';
import SuratLembaranDaerah from './templates/SuratLembaranDaerah.vue';

const route = useRouter();

const props = defineProps({
  templateName: String,
  formData: Object,
  token: String,
  id: String,
  image: String,
});

const templateComponents = {
  tugas: SuratTugas,
  instruksi: Instruksi,
  sertifikat: Sertifikat,
  dinas_kepala_daerah: SuratDinasKpd,
  dinas_perangkat_daerah: SuratDinasPerangkatDaerah,
  perintah: SuratPerintah,
  nota_dinas: NotaDinas,
  memo: Memo,
  edaran: SuratEdaran,
  kuasa: SuratKuasa,
  keterangan: SuratKeterangan,
  pengumuman: SuratPengumuman,
  notula: SuratNotula,
  undangan: SuratUndangan,
  pelaksanaan_tugas: Pelaksanaantugas,
  panggilan: Suratpanggilan,
  izin_kepala_daerah: SuratIzin,
  izin_perangkat_daerah: SuratIzinPerangkat,
  berita_acara: BeritaAcara,
  lembaran_daerah: SuratLembaranDaerah,
  sttp: Sttp,
  telaahan_staff: Telaahan,
  laporan: Laporan,
  pengantar: Pengantar,
  berita_daerah: BeritaDaerah,
  rekomendasi: SuratRekomendasi,
  radiogram: SuratRadiogram,
  disposisi: Disposisi,
  perjalanan_dinas: SuratPerjalananDinas,
};

const templateComponent = computed(() => templateComponents[props.templateName] || null);
</script>
