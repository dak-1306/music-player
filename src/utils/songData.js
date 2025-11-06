import sayonaraNoNatsu from "../assets/img/song/kokurikozaka050.jpg";
import morinoChisanaRestaurants from "../assets/img/song/kokurikozaka008.jpg";
import merryGoRoundOfLife from "../assets/img/song/howl049.jpg";
import ForgottenWordsCover from "../assets/img/song/ForgottenWords.jpg";
import PromiseOfTheWorld from "../assets/img/song/howl050.jpg";
import AlwaysWithMe from "../assets/img/song/chihiro044.jpg";
import InochiNoNamae from "../assets/img/song/inochinoNamae.jpg";
import InoChiNoNamae_cover from "../assets/img/song/InochiNoNamae_Dazzez.jpg";
import ForgottenWords_dezbee from "../assets/img/song/ForgottenWords_DezBee.jpg";
import PathOfTheWind from "../assets/img/song/PathOfTheWind.jpg";
import MeguruKisetsu from "../assets/img/song/MeguruKisetsu.jpg";
import MeguruKisetsu_piano from "../assets/img/song/MeguruLisetsu_piano.jpg";
import CarringYou from "../assets/img/song/carringYou.jpg";
import CarringYou_piano from "../assets/img/song/CarringYou_piano.jpg";
import CarringYou_Joshi from "../assets/img/song/CarringYou_Joshi.jpg";
import ArrietySong from "../assets/img/song/ArrietySong.jpg";
import Mononoke_main from "../assets/img/song/Mononoke_main.jpg";
import Mononoke_hime from "../assets/img/song/Mononoke_hime.jpg";

const songData = [
  {
    id: 1,
    idThemes: 0,
    title: "Sayonara no Natsu",
    artist: "Aoi Teshima",
    duration: 210,
    provider: "youtube",
    videoId: "QQkjoZriWNo", // Chỉ cần videoId là đủ
    cover: sayonaraNoNatsu,
  },
  {
    id: 2,
    idThemes: 1,
    title: "Merry-Go-Round of Life",
    artist: "Joe Hisaishi",
    duration: 180,
    provider: "youtube",
    videoId: "J6qIzKxmW8Y", // Chỉ cần videoId là đủ
    cover: merryGoRoundOfLife,
  },
  {
    id: 3,
    idThemes: 0,
    title: "Morino Chisana Restaurant",
    artist: "Aoi Teshima",
    duration: 210,
    provider: "youtube",
    videoId: "EYGGd2NKwtI", // Chỉ cần videoId là đủ
    cover: morinoChisanaRestaurants,
  },
  {
    id: 4,
    idThemes: 5,
    title: "Forgotten Words",
    artist: "Mirai kodai",
    duration: 240,
    provider: "youtube",
    videoId: "uB2GnZ1IVxA",
    cover: ForgottenWordsCover,
  },
  {
    id: 5,
    idThemes: 1,
    title: "Promise of the World",
    artist: "Joe Hisaishi",
    duration: 200,
    provider: "youtube",
    videoId: "u2qL3aRuuxY",
    cover: PromiseOfTheWorld,
  },
  {
    id: 6,
    idThemes: 2,
    title: "Always With Me",
    artist: "Youmi Kimura",
    duration: 220,
    provider: "youtube",
    videoId: "tBSthP5LTZU",
    cover: AlwaysWithMe,
  },
  {
    id: 7,
    idThemes: 2,
    title: "Inochi No Namae",
    artist: "Youmi Kimura",
    duration: 230,
    provider: "youtube",
    videoId: "uaOuKBayRSk",
    cover: InochiNoNamae,
  },
  {
    id: 8,
    idThemes: 2,
    title: "InoChi No Namae",
    artist: "Dazbee",
    duration: 230,
    provider: "youtube",
    videoId: "DKQ3KIR3Tfg",
    cover: InoChiNoNamae_cover,
  },
  {
    id: 9,
    idThemes: 5,
    title: "Forgotten Words",
    artist: "Dazbee",
    duration: 240,
    provider: "youtube",
    videoId: "lFNWUL9fqG8",
    cover: ForgottenWords_dezbee,
  },
  {
    id: 10,
    idThemes: 3,
    title: "Path of the Wind",
    artist: "Joe Hisaishi",
    duration: 240,
    provider: "youtube",
    videoId: "MZgBjQFMPvk",
    cover: PathOfTheWind,
  },

  {
    id: 11,
    idThemes: 4,
    title: "Meguru Kisetsu",
    artist: "Yumi Arai",
    duration: 210,
    provider: "youtube",
    videoId: "5e65bwX5uOM",
    cover: MeguruKisetsu,
  },
  {
    id: 12,
    idThemes: 4,
    title: "Meguru Kisetsu (Piano Version)",
    artist: "Yumi Arai",
    duration: 215,
    provider: "youtube",
    videoId: "hpfLKbjTWn0",
    cover: MeguruKisetsu_piano,
  },
  {
    id: 13,
    idThemes: 6,
    title: "Carrying You",
    artist: "Kimi wo Nosete",
    duration: 240,
    provider: "youtube",
    videoId: "gdpEnkcT7Io",
    cover: CarringYou,
  },
  {
    id: 14,
    idThemes: 6,
    title: "Carrying You (Piano Version)",
    artist: "Kimi wo Nosete",
    duration: 245,
    provider: "youtube",
    videoId: "655CBltpj9A",
    cover: CarringYou_piano,
  },
  {
    id: 15,
    idThemes: 6,
    title: "Carrying You (Joshi Version)",
    artist: "Kimi wo Nosete",
    duration: 250,
    provider: "youtube",
    videoId: "RWi-AIhK4RE",
    cover: CarringYou_Joshi,
  },
  {
    id: 16,
    idThemes: 7,
    title: "Arrietty's Song",
    artist: "Cécile Corbel",
    duration: 240,
    provider: "youtube",
    videoId: "tV6S7xwLF8o",
    cover: ArrietySong,
  },
  {
    id: 17,
    idThemes: 8,
    title: "Mononoke Hime Main Theme",
    artist: "Joe Hisaishi",
    duration: 240,
    provider: "youtube",
    videoId: "nBADF1LdP3g",
    cover: Mononoke_main,
  },
  {
    id: 18,
    idThemes: 8,
    title: "Mononoke Hime Theme (Vocal Version)",
    artist: "Joe Hisaishi",
    duration: 240,
    provider: "youtube",
    videoId: "3jdjZR3X1cE",
    cover: Mononoke_hime,
  },
];
export default songData;
