import { z } from "zod";

export const FlowerType = z.enum(["rose", "lavender", "sunflower", "peony", "lily"]);
export type FlowerType = z.infer<typeof FlowerType>;

export interface FlowerData {
  id: number;
  type: FlowerType;
  name: string;
  color: string;
  message: string;
  leftPos: number;
  height: number;
}

export const FLOWER_DATA: FlowerData[] = [
  {
    id: 1,
    type: "rose",
    name: "Red Rose",
    color: "#990d23",
    leftPos: 10,
    height: 60,
    message: "Mawar merah ini melambangkan cintaku yang tak pernah pudar. Setiap hari bersamamu terasa seperti anugerah yang paling indah. Kamu adalah alasan mengapa aku tersenyum bahkan di hari yang paling sulit sekalipun. Aku mencintaimu lebih dari kata-kata bisa ungkapkan.",
  },
  {
    id: 2,
    type: "lavender",
    name: "Lavender",
    color: "#8c6db1",
    leftPos: 25,
    height: 45,
    message: "Lavender ini membawa ketenangan, seperti yang selalu kamu bawa dalam hidupku. Di sisimu, dunia terasa lebih ringan dan indah. Terima kasih sudah menjadi tempatku pulang — tempat yang paling aman dan hangat di seluruh semesta.",
  },
  {
    id: 3,
    type: "sunflower",
    name: "Sunflower",
    color: "#e6b722",
    leftPos: 50,
    height: 75,
    message: "Seperti bunga matahari yang selalu menghadap matahari, aku selalu mencarimu di setiap ruangan. Kamu adalah cahayaku. Kamu adalah semangat yang membuat setiap pagiku berarti. Bersama kamu, bahkan hari biasa pun terasa luar biasa.",
  },
  {
    id: 4,
    type: "peony",
    name: "Pink Peony",
    color: "#e88ea4",
    leftPos: 70,
    height: 55,
    message: "Peony ini mekar dengan penuh keindahan, seperti cintaku yang terus tumbuh bersamamu. Setiap momen bersamamu tersimpan rapi di hatiku — tawa kita, pelukan kita, semua tatapan kita. Kamu adalah kisah paling indah yang pernah kuhidupi.",
  },
  {
    id: 5,
    type: "lily",
    name: "White Lily",
    color: "#f4f4f4",
    leftPos: 88,
    height: 65,
    message: "Lily putih ini melambangkan kesucian perasaanku padamu. Tidak ada yang lebih tulus dari cintaku untukmu. Kamu telah mengisi hidupku dengan warna-warna yang tak pernah kubayangkan sebelumnya. Untuk selamanya, kamu akan selalu ada di hatiku.",
  }
];
