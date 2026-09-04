import type { ProseSection } from "@/components/Prose";
import type { Locale } from "@/config/site";

/**
 * Learn hub posts. Newest first.
 *
 * Two kinds:
 *  - "explainer": evergreen, written once, revised with `updated`.
 *  - "weekly": the AishCopytrade weekly breakdown republished from the public
 *    channel. Procedure and format in docs/weekly-breakdown.md. Every figure
 *    in a weekly post is copied from the broker dashboard on a stated date.
 *
 * No placeholder posts, no invented figures. Worked examples inside an
 * explainer must say they are hypothetical. Every string exists in both
 * locales. `npm run check:copy` applies the copy rules to this file.
 */
export interface Post {
  slug: string;
  kind: "explainer" | "weekly";
  /** ISO date YYYY-MM-DD the post was published. */
  date: string;
  /** ISO date of the last substantive revision, if any. */
  updated?: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** Optional real image. Never a placeholder. */
  image?: { src: string; alt: Record<Locale, string> };
  /** External URL (e.g. a Telegram post). Omit to render the post at /learn/{slug}. */
  href?: string;
  /** Short bullets shown before the body. */
  keyPoints?: Record<Locale, string[]>;
  sections?: Record<Locale, ProseSection[]>;
}

export const POSTS: Post[] = [
  {
    slug: "how-copy-trading-executes",
    kind: "explainer",
    date: "2026-09-04",
    title: {
      en: "How copy trading actually executes",
      ms: "Bagaimana copy trading sebenarnya dilaksanakan",
    },
    excerpt: {
      en: "What the broker's system does the moment AishCopytrade opens a trade, why your fill differs, and how the fee is worked out.",
      ms: "Apa yang sistem broker lakukan sebaik sahaja AishCopytrade membuka dagangan, mengapa harga isian anda berbeza, dan bagaimana yuran dikira.",
    },
    keyPoints: {
      en: [
        "Your money never leaves your own broker account. Nothing is pooled and nothing is sent to us.",
        "The direction of each trade copies. Size, price and timing differ every time.",
        "The performance fee is calculated by the broker's system on gains only. Losses copy just as faithfully.",
        "You disconnect from your own account at any time. Check what the broker does with open trades first.",
      ],
      ms: [
        "Wang anda tidak pernah keluar daripada akaun broker anda sendiri. Tiada apa-apa dikumpulkan dan tiada apa-apa dihantar kepada kami.",
        "Arah setiap dagangan disalin. Saiz, harga dan masa berbeza setiap kali.",
        "Yuran prestasi dikira oleh sistem broker ke atas keuntungan sahaja. Kerugian disalin sama setianya.",
        "Anda memutuskan sambungan daripada akaun anda sendiri pada bila-bila masa. Semak dahulu apa yang broker lakukan dengan dagangan terbuka.",
      ],
    },
    sections: {
      en: [
        {
          title: "One account, many mirrors",
          body: [
            "AishCopytrade is an ordinary trading account at the broker. The broker's copy-trading system watches it. When it opens a trade, changes a stop, or closes a position, the system repeats that action in every account connected to it.",
            "The connection lives entirely inside the broker's platform. Nothing passes through Aish Capital. We never see your login, your balance, or your trades, and we cannot place, change, or close anything in your account.",
          ],
        },
        {
          title: "How your size is decided",
          body: [
            "When you connect, you allocate an amount. Most broker systems then scale each copied trade by the ratio between your allocation and AishCopytrade's own equity. If your allocation is a tenth of that equity, your copied trade is roughly a tenth of the size. The exact rule is written in your broker's copy-trading terms, and it is worth reading once.",
            "Brokers also enforce a minimum trade size, usually 0.01 lots. A scaled trade is rounded to that step. With a small allocation the rounding can push your trade to zero, so it is skipped, or up to the minimum, which is then a larger share of your money than intended. This rounding is the first reason copied results never match the original exactly.",
          ],
        },
        {
          title: "Why your fill is not the same fill",
          body: [
            "The copy happens after the original trade is placed. In the moments between, the price can move, and your trade fills at whatever price is available when the system reaches your account. Account types can also carry different spreads.",
            "So your entry and your exit are slightly different from AishCopytrade's, every time. Over many trades the difference is usually small, but it is never zero, and in a fast market it can be large. Direction copies; price does not.",
          ],
        },
        {
          title: "The moment you connect, and the moment you leave",
          body: [
            "On connection, most systems do not copy trades that are already open. You join from the next trade AishCopytrade places. Some brokers offer to copy open positions at the current price; that is a choice with its own risk, because you enter at a different point from the original.",
            "On disconnection, the broker's rule decides what happens to copied trades that are still open. Some systems close them at market immediately; others leave them in your account for you to manage. Find out which before you press the button. Your account stays in your name throughout, and you never need our permission to leave.",
          ],
        },
        {
          title: "How the fee is worked out",
          body: [
            "The performance fee is a percentage of the gains the copy makes in your account. It is calculated and collected by the broker's copy-trading system, on the schedule the broker sets, not by us and not by hand.",
            "Many systems apply a high-water mark: a fee is only charged on gains above the highest level your copied balance has reached before. If your account falls and then recovers to where it was, no fee is charged on the recovery. Check whether your broker's system works this way. Nothing is ever charged on a loss.",
            "The broker's own spread and commission are separate. They are charged on every trade, whether you copy or trade yourself, and they are the broker's to set.",
          ],
        },
        {
          title: "What this means in practice",
          body: [
            "Your results will not match AishCopytrade's. The direction of each trade matches; the sizes, prices, and timing differ. A losing week on AishCopytrade is a losing week in your account too, scaled to your allocation.",
            "Allocate only money you can lose entirely, read the broker's copy-trading terms in full once, and know the disconnection rule before you need it.",
          ],
        },
      ],
      ms: [
        {
          title: "Satu akaun, banyak cermin",
          body: [
            "AishCopytrade ialah akaun dagangan biasa di broker. Sistem copy trading broker memerhatikannya. Apabila ia membuka dagangan, mengubah stop, atau menutup kedudukan, sistem itu mengulangi tindakan yang sama dalam setiap akaun yang bersambung kepadanya.",
            "Sambungan itu wujud sepenuhnya di dalam platform broker. Tiada apa-apa melalui Aish Capital. Kami tidak pernah melihat log masuk, baki, atau dagangan anda, dan kami tidak boleh membuka, mengubah, atau menutup apa-apa dalam akaun anda.",
          ],
        },
        {
          title: "Bagaimana saiz anda ditentukan",
          body: [
            "Apabila anda menyambung, anda memperuntukkan satu jumlah. Kebanyakan sistem broker kemudian menskalakan setiap dagangan yang disalin mengikut nisbah antara peruntukan anda dan ekuiti AishCopytrade sendiri. Jika peruntukan anda satu persepuluh daripada ekuiti itu, dagangan salinan anda lebih kurang satu persepuluh saiznya. Peraturan tepatnya tertulis dalam terma copy trading broker anda, dan ia berbaloi dibaca sekali.",
            "Broker juga menetapkan saiz dagangan minimum, biasanya 0.01 lot. Dagangan yang diskalakan dibundarkan kepada langkah itu. Dengan peruntukan yang kecil, pembundaran boleh menolak dagangan anda ke sifar, lalu ia dilangkau, atau ke atas kepada minimum, yang kemudiannya menjadi bahagian wang anda yang lebih besar daripada yang dimaksudkan. Pembundaran ini ialah sebab pertama keputusan salinan tidak pernah sama tepat dengan yang asal.",
          ],
        },
        {
          title: "Mengapa isian anda bukan isian yang sama",
          body: [
            "Salinan berlaku selepas dagangan asal dibuat. Dalam saat-saat di antaranya, harga boleh bergerak, dan dagangan anda diisi pada apa-apa harga yang ada apabila sistem sampai ke akaun anda. Jenis akaun juga boleh membawa spread yang berbeza.",
            "Jadi harga masuk dan harga keluar anda sedikit berbeza daripada AishCopytrade, setiap kali. Merentasi banyak dagangan, perbezaannya biasanya kecil, tetapi tidak pernah sifar, dan dalam pasaran yang pantas ia boleh menjadi besar. Arah disalin; harga tidak.",
          ],
        },
        {
          title: "Saat anda menyambung, dan saat anda keluar",
          body: [
            "Semasa menyambung, kebanyakan sistem tidak menyalin dagangan yang sudah terbuka. Anda menyertai bermula daripada dagangan seterusnya yang AishCopytrade buat. Sesetengah broker menawarkan untuk menyalin kedudukan terbuka pada harga semasa; itu satu pilihan dengan risikonya sendiri, kerana anda masuk pada titik yang berbeza daripada yang asal.",
            "Semasa memutuskan sambungan, peraturan broker menentukan apa yang berlaku kepada dagangan salinan yang masih terbuka. Sesetengah sistem menutupnya pada harga pasaran serta-merta; yang lain membiarkannya dalam akaun anda untuk anda uruskan. Ketahui yang mana satu sebelum anda menekan butang. Akaun anda kekal atas nama anda sepanjang masa, dan anda tidak pernah memerlukan kebenaran kami untuk keluar.",
          ],
        },
        {
          title: "Bagaimana yuran dikira",
          body: [
            "Yuran prestasi ialah peratusan daripada keuntungan yang dihasilkan oleh salinan dalam akaun anda. Ia dikira dan dikutip oleh sistem copy trading broker, mengikut jadual yang broker tetapkan, bukan oleh kami dan bukan secara manual.",
            "Banyak sistem menggunakan tanda paras tertinggi (high-water mark): yuran hanya dikenakan ke atas keuntungan melebihi paras tertinggi yang pernah dicapai oleh baki salinan anda sebelum ini. Jika akaun anda jatuh dan kemudian pulih ke paras asal, tiada yuran dikenakan ke atas pemulihan itu. Semak sama ada sistem broker anda berfungsi begini. Tiada apa-apa dikenakan ke atas kerugian.",
            "Spread dan komisen broker sendiri adalah berasingan. Ia dikenakan ke atas setiap dagangan, sama ada anda menyalin atau berdagang sendiri, dan ia ditetapkan oleh broker.",
          ],
        },
        {
          title: "Apa maksudnya dalam praktik",
          body: [
            "Keputusan anda tidak akan sama dengan AishCopytrade. Arah setiap dagangan sama; saiz, harga, dan masa berbeza. Minggu yang rugi bagi AishCopytrade ialah minggu yang rugi dalam akaun anda juga, mengikut skala peruntukan anda.",
            "Peruntukkan hanya wang yang anda sanggup kehilangan sepenuhnya, baca terma copy trading broker sepenuhnya sekali, dan ketahui peraturan pemutusan sambungan sebelum anda memerlukannya.",
          ],
        },
      ],
    },
  },
  {
    slug: "leverage-1-1000",
    kind: "explainer",
    date: "2026-09-04",
    title: {
      en: "What leverage does at 1:1000",
      ms: "Apa yang leveraj lakukan pada 1:1000",
    },
    excerpt: {
      en: "The arithmetic behind the ratio on the card, why accounts go to zero and below, and why available leverage is not the same as leverage used.",
      ms: "Aritmetik di sebalik nisbah pada kad, mengapa akaun boleh jatuh ke sifar dan ke bawahnya, dan mengapa leveraj yang tersedia bukan leveraj yang digunakan.",
    },
    keyPoints: {
      en: [
        "1:1000 means 100 dollars of margin can hold a 100,000-dollar position.",
        "A move of one tenth of one percent against a fully margined position uses up the whole margin.",
        "Stop-out closes positions automatically. A price gap can take an account below zero.",
        "Available leverage is a ceiling. Position size relative to equity is what actually matters.",
      ],
      ms: [
        "1:1000 bermakna margin 100 dolar boleh memegang kedudukan bernilai 100,000 dolar.",
        "Pergerakan satu persepuluh daripada satu peratus menentang kedudukan yang bermargin penuh menghabiskan keseluruhan margin.",
        "Stop-out menutup kedudukan secara automatik. Lompatan harga boleh membawa akaun ke bawah sifar.",
        "Leveraj yang tersedia ialah siling. Saiz kedudukan berbanding ekuiti ialah perkara yang sebenarnya penting.",
      ],
    },
    sections: {
      en: [
        {
          title: "What the ratio means",
          body: [
            "Leverage of 1:1000 means the broker lets you hold a position worth up to a thousand times the margin you set aside for it. One hundred dollars of margin can hold a position worth one hundred thousand dollars.",
            "Leverage does not change how far prices move. It changes how much of your account each move represents. That is the whole effect, and it works in both directions.",
          ],
        },
        {
          title: "A worked example, not a real trade",
          body: [
            "Suppose gold trades at three thousand dollars an ounce. That is a round number chosen for the arithmetic, not a quote. On most brokers a standard lot of gold is one hundred ounces, so one lot is a position worth three hundred thousand dollars. At 1:1000 the margin the broker asks for that lot is three hundred dollars.",
            "If gold moves three dollars, which is one tenth of one percent, the position moves three hundred dollars. That is the whole margin, gained or lost, on a move that happens many times in an ordinary day. A thirty-dollar move, one percent, is ten times the margin.",
            "The same trade at 1:100 would need three thousand dollars of margin. The move would cost the same three hundred dollars, but it would be a tenth of the margin instead of all of it. The market did the same thing; the account did not.",
          ],
        },
        {
          title: "Why accounts go to zero, and below",
          body: [
            "Every broker sets a stop-out level. When the equity in an account falls to that level relative to the margin in use, the broker closes positions automatically, without asking. It is not a safety net for you; it protects the broker.",
            "In a fast market the price can jump over the level in one step, so the positions close at a worse price than the stop-out level assumed. The account can then be below zero. Some brokers offer negative balance protection and reset the account to zero; others may ask you to pay the difference. Check which applies to yours before you deposit, and never rely on it.",
          ],
        },
        {
          title: "Available leverage is not leverage used",
          body: [
            "1:1000 is a ceiling, not a setting that is always in use. What matters is the size of the open positions relative to the equity in the account. A 0.01-lot position on a one-thousand-dollar account uses a small fraction of that ceiling; ten lots on the same account use nearly all of it.",
            "The card on this site shows 1:1000 because that is the account's setting at the broker. It says nothing about how large any individual trade is. The closed-trade count, the open-trade count, and the maximum drawdown figure, read together over time, say more.",
          ],
        },
        {
          title: "What it means if you copy",
          body: [
            "Copied trades are scaled to your allocation, so a percentage move on AishCopytrade lands on your allocation in roughly the same proportion. A drawdown of a given size there is a drawdown of roughly that size in your copied money. Roughly, not exactly, because your fills and rounding differ.",
            "That is why the allocation should be money you can lose entirely. Leverage does not make a strategy better or worse. It makes every outcome, including the worst one, arrive faster.",
          ],
        },
      ],
      ms: [
        {
          title: "Apa maksud nisbah itu",
          body: [
            "Leveraj 1:1000 bermakna broker membenarkan anda memegang kedudukan bernilai sehingga seribu kali ganda margin yang anda ketepikan untuknya. Margin seratus dolar boleh memegang kedudukan bernilai seratus ribu dolar.",
            "Leveraj tidak mengubah sejauh mana harga bergerak. Ia mengubah berapa banyak daripada akaun anda yang diwakili oleh setiap pergerakan. Itulah keseluruhan kesannya, dan ia berfungsi dalam kedua-dua arah.",
          ],
        },
        {
          title: "Contoh kiraan, bukan dagangan sebenar",
          body: [
            "Andaikan emas didagangkan pada tiga ribu dolar seauns. Itu nombor bulat yang dipilih untuk kiraan, bukan sebut harga. Di kebanyakan broker, satu lot standard emas ialah seratus auns, jadi satu lot ialah kedudukan bernilai tiga ratus ribu dolar. Pada 1:1000, margin yang broker minta untuk lot itu ialah tiga ratus dolar.",
            "Jika emas bergerak tiga dolar, iaitu satu persepuluh daripada satu peratus, kedudukan itu bergerak tiga ratus dolar. Itulah keseluruhan margin, diperoleh atau hilang, pada pergerakan yang berlaku banyak kali dalam hari biasa. Pergerakan tiga puluh dolar, satu peratus, ialah sepuluh kali ganda margin.",
            "Dagangan yang sama pada 1:100 memerlukan margin tiga ribu dolar. Pergerakan itu menelan tiga ratus dolar yang sama, tetapi ia hanya satu persepuluh daripada margin dan bukan keseluruhannya. Pasaran melakukan perkara yang sama; akaun tidak.",
          ],
        },
        {
          title: "Mengapa akaun jatuh ke sifar, dan ke bawahnya",
          body: [
            "Setiap broker menetapkan paras stop-out. Apabila ekuiti dalam akaun jatuh ke paras itu berbanding margin yang digunakan, broker menutup kedudukan secara automatik, tanpa bertanya. Ia bukan jaring keselamatan untuk anda; ia melindungi broker.",
            "Dalam pasaran yang pantas, harga boleh melompat melepasi paras itu dalam satu langkah, jadi kedudukan ditutup pada harga yang lebih teruk daripada yang diandaikan oleh paras stop-out. Akaun kemudiannya boleh berada di bawah sifar. Sesetengah broker menawarkan perlindungan baki negatif dan menetapkan semula akaun kepada sifar; yang lain mungkin meminta anda membayar perbezaannya. Semak yang mana terpakai untuk akaun anda sebelum mendeposit, dan jangan sekali-kali bergantung kepadanya.",
          ],
        },
        {
          title: "Leveraj yang tersedia bukan leveraj yang digunakan",
          body: [
            "1:1000 ialah siling, bukan tetapan yang sentiasa digunakan. Yang penting ialah saiz kedudukan terbuka berbanding ekuiti dalam akaun. Kedudukan 0.01 lot pada akaun seribu dolar menggunakan sebahagian kecil daripada siling itu; sepuluh lot pada akaun yang sama menggunakan hampir kesemuanya.",
            "Kad di laman ini menunjukkan 1:1000 kerana itulah tetapan akaun di broker. Ia tidak mengatakan apa-apa tentang sebesar mana sesuatu dagangan. Bilangan dagangan ditutup, bilangan dagangan terbuka, dan angka penurunan maksimum, dibaca bersama dari semasa ke semasa, mengatakan lebih banyak.",
          ],
        },
        {
          title: "Apa maksudnya jika anda menyalin",
          body: [
            "Dagangan yang disalin diskalakan mengikut peruntukan anda, jadi pergerakan peratusan pada AishCopytrade jatuh ke atas peruntukan anda dalam kadar yang lebih kurang sama. Penurunan sebesar tertentu di sana ialah penurunan lebih kurang sebesar itu dalam wang salinan anda. Lebih kurang, bukan tepat, kerana isian dan pembundaran anda berbeza.",
            "Itulah sebabnya peruntukan itu sepatutnya wang yang anda sanggup kehilangan sepenuhnya. Leveraj tidak menjadikan sesuatu strategi lebih baik atau lebih buruk. Ia menjadikan setiap hasil, termasuk yang paling buruk, tiba lebih cepat.",
          ],
        },
      ],
    },
  },
];

/** Internal route or the external override. */
export function postHref(post: Post, locale: Locale): string {
  return post.href ?? `/${locale}/learn/${post.slug}`;
}
