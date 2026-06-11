import { Question } from '../types';

export const QUESTIONS_POOL: Question[] = [
  // ==================== LEVEL 1 ====================
  {
    id: 'q1_1',
    level: 1,
    text: 'Sütten yapılan, genellikle kahvaltılarda yenilen ve taze veya kaşar gibi çeşitleri olan yiyecek hangisidir?',
    options: { A: 'Ekmek', B: 'Peynir', C: 'Zeytin', D: 'Reçel' },
    correctOption: 'B',
    category: 'Günlük Yaşam',
    explanation: 'Peynir süt koagülasyonu ile elde edilen ve kahvaltılarımızın vazgeçilmezi olan protein deposudur.'
  },
  {
    id: 'q1_2',
    level: 1,
    text: 'Genellikle "Lütfen sessiz olun" tabelası bulunan ve ödünç kitap alınan yer neresidir?',
    options: { A: 'Kütüphane', B: 'Manav', C: 'Stadyum', D: 'Karakol' },
    correctOption: 'A',
    category: 'Genel Kültür',
    explanation: 'Kütüphaneler, sessizce kitap okunabilecek ve araştırma yapılebilecek kültür merkezleridir.'
  },
  {
    id: 'q1_3',
    level: 1,
    text: '"Göze girmek" deyimi genellikle hangi anlama gelir?',
    options: { A: 'Göz doktoruna görünmek', B: 'İlgi ve sevgi kazanmak', C: 'Tehlikeli bir işe kalkışmak', D: 'Gözlük satın almak' },
    correctOption: 'B',
    category: 'Türkçe & Deyimler',
    explanation: 'Göze girmek, davranışları veya yetenekleriyle birinin sevgi, güven ve takdirini kazanmaktır.'
  },
  {
    id: 'q1_4',
    level: 1,
    text: 'Hangi mevsimde genellikle kar yağar ve hava en soğuk derecelere ulaşır?',
    options: { A: 'Kış', B: 'Yaz', C: 'İlkbahar', D: 'Sonbahar' },
    correctOption: 'A',
    category: 'Günlük Yaşam',
    explanation: 'Kar yağışı ve en soğuk günler genellikle kış mevsiminde yaşanır.'
  },
  {
    id: 'q1_5',
    level: 1,
    text: 'Karagöz ile kim geleneksel Türk gölge oyununun iki ana karakteridir?',
    options: { A: 'Kelgöz', B: 'Hacivat', C: 'Keloğlan', D: 'İbiş' },
    correctOption: 'B',
    category: 'Genel Kültür',
    explanation: 'Karagöz ve Hacivat, perdede oynatılan geleneksel gölge oyunumuzun temel figürleridir.'
  },
  {
    id: 'q1_6',
    level: 1,
    text: 'Haftanın ilk çalışma ve okul günü olan gün hangisidir?',
    options: { A: 'Salı', B: 'Cuma', C: 'Cumartesi', D: 'Pazartesi' },
    correctOption: 'D',
    category: 'Günlük Yaşam',
    explanation: 'Haftanın yedi gününden ilki Pazartesi günüdür.'
  },
  {
    id: 'q1_7',
    level: 1,
    text: 'Hangisi bir gökyüzü cismidir ve geceleri berrak havada parıldayarak görünür?',
    options: { A: 'Yıldız', B: 'Ağaç', C: 'Taş', D: 'Çöp' },
    correctOption: 'A',
    category: 'Doğa Bilimleri',
    explanation: 'Yıldızlar, geceleri gökyüzünde ışık saçan gök cisimleridir.'
  },

  // ==================== LEVEL 2 ====================
  {
    id: 'q2_1',
    level: 2,
    text: 'Hangi meyve "Amasya" dendiğinde akla ilk gelen ve tescilli olan tarım ürünüdür?',
    options: { A: 'Şeftali', B: 'Karpuz', C: 'Elma', D: 'Mandalina' },
    correctOption: 'C',
    category: 'Coğrafya',
    explanation: 'Amasya misket elması, kendine has kokusu, sertliği ve sulu yapısıyla ünlüdür.'
  },
  {
    id: 'q2_2',
    level: 2,
    text: 'Futbolda bir takımın kendi yarı sahasındaki kale çizgisine ne ad verilir?',
    options: { A: 'Taç çizgisi', B: 'Ceza sahası', C: 'Orta yuvarlak', D: 'Kale çizgisi' },
    correctOption: 'D',
    category: 'Spor',
    explanation: 'Kale çizgisi, kalelerin üzerinde bulunduğu ve topun geçmesi durumunda gol sayıldığı çizgidir.'
  },
  {
    id: 'q2_3',
    level: 2,
    text: 'Türk bayrağındaki hilal ve yıldız figürleri hangi renk zemin üzerine yerleştirilmiştir?',
    options: { A: 'Mavi', B: 'Yeşil', C: 'Kırmızı', D: 'Beyaz' },
    correctOption: 'C',
    category: 'Genel Kültür',
    explanation: 'Türk bayrağı, kırmızı zemin üzerine beyaz hilal ve yıldızdan oluşur.'
  },
  {
    id: 'q2_4',
    level: 2,
    text: 'Havadaki su buharının aniden çok soğuk bir hava katmanıyla karşılaşarak buz kristalleri halinde düşmesi nedir?',
    options: { A: 'Sis', B: 'Çiy', C: 'Kar', D: 'Dolu' },
    correctOption: 'C',
    category: 'Meteoroloji',
    explanation: 'Kar, bulutlardaki su taneciklerinin aşırı soğuk nedeniyle buz tanelerine dönüşüp süzülerek yere inmesidir.'
  },
  {
    id: 'q2_5',
    level: 2,
    text: 'Masallarda saçsız kafası ve pratik zekasıyla saraydakileri bile hayran bırakan fakir kahraman kimdir?',
    options: { A: 'Keloğlan', B: 'Sindirella', C: 'Kırmızı Başlıklı Kız', D: 'Külkedisi' },
    correctOption: 'A',
    category: 'Edebiyat / Masal',
    explanation: 'Keloğlan, Türk masal dünyasının en sevilen, dürüst ve zeki saçsız kahramanıdır.'
  },
  {
    id: 'q2_6',
    level: 2,
    text: 'Futbolda sarı kartı olan bir oyuncu, aynı maçta ikinci kez sarı kart görürse hakem hangi kartı gösterir?',
    options: { A: 'Mavi kart', B: 'Kırmızı kart', C: 'Yeşil kart', D: 'Turuncu kart' },
    correctOption: 'B',
    category: 'Spor',
    explanation: 'Oyuncu ikinci sarı karttan kırmızı kart görerek oyundan ihraç edilir.'
  },
  {
    id: 'q2_7',
    level: 2,
    text: '"Ekmek kapısı" deyimi halk arasında genellikle hangi anlamda kullanılır?',
    options: { A: 'Fırın kapısı', B: 'Geçim sağlanan iş yeri', C: 'Mutfak tezgahı', D: 'Yemek masası' },
    correctOption: 'B',
    category: 'Türkçe & Deyimler',
    explanation: 'Ekmek kapısı, bir insanın hayatını sürdürmek için kazanç sağladığı iş veya meslek anlamına gelir.'
  },

  // ==================== LEVEL 3 ====================
  {
    id: 'q3_1',
    level: 3,
    text: 'Ünlü masal kahramanı Külkedisi (Cinderella) gece yarısı saat kaçta baloyu terk etmek zorundadır?',
    options: { A: '21:00', B: '22:00', C: '00:00', D: '03:00' },
    correctOption: 'C',
    category: 'Edebiyat & Masal',
    explanation: 'İyilik perisinin büyüsü gece yarısı saat tam 12:00 (00:00) olduğunda bozulmaktadır.'
  },
  {
    id: 'q3_2',
    level: 3,
    text: 'Türkiye Cumhuriyeti\'nin para birimi olan Türk Lirası\'nın uluslararası ISO kodu nedir?',
    options: { A: 'TL', B: 'TRY', C: 'TRL', D: 'YTL' },
    correctOption: 'B',
    category: 'Ekonomi / Genel Kültür',
    explanation: 'Türk Lirası\'nın uluslararası standardizasyon kodu TRY\'dir.'
  },
  {
    id: 'q3_3',
    level: 3,
    text: 'Geceleri gökyüzünde en parlak görünen, Dünya\'nın tek doğal uydusu hangisidir?',
    options: { A: 'Ay', B: 'Mars', C: 'Kutup Yıldızı', D: 'Venüs' },
    correctOption: 'A',
    category: 'Gökbilim',
    explanation: 'Ay, Dünya\'nın tek doğal uydusudur ve Güneş\'ten aldığı ışığı yansıtır.'
  },
  {
    id: 'q3_4',
    level: 3,
    text: 'Türkiye Cumhuriyeti\'nin kurucusu Gazi Mustafa Kemal Atatürk hangi şehirde dünyaya gelmiştir?',
    options: { A: 'Ankara', B: 'İstanbul', C: 'Selanik', D: 'İzmir' },
    correctOption: 'C',
    category: 'Tarih',
    explanation: 'Mustafa Kemal Atatürk, 1881 yılında o dönemde Osmanlı toprağı olan Selanik\'te doğmuştur.'
  },
  {
    id: 'q3_5',
    level: 3,
    text: 'Bir üçgenin iç açılarının toplamı her zaman kaç derecedir?',
    options: { A: '90', B: '180', C: '270', D: '360' },
    correctOption: 'B',
    category: 'Matematik',
    explanation: 'Öklid geometrisinde her türlü üçgenin iç açılarının toplamı 180 dereceye sabittir.'
  },
  {
    id: 'q3_6',
    level: 3,
    text: 'Dünya\'yı çevreleyen atmosfer havasında en yüksek oranda bulunan gaz hangisidir?',
    options: { A: 'Oksijen', B: 'Azot (Nitrojen)', C: 'Karbondioksit', D: 'Helyum' },
    correctOption: 'B',
    category: 'Kimya / Coğrafya',
    explanation: 'Atmosfer havasının yaklaşık %78\'i azot, %21\'i ise oksijendir.'
  },
  {
    id: 'q3_7',
    level: 3,
    text: '"Ağaç yaşken eğilir" atasözü temel olarak aşağıdakilerden hangisini vurgular?',
    options: { A: 'Ağaçların esnekliğini', B: 'Eğitimin küçük yaşta verilmesi gerektiğini', C: 'Ormanların korunmasını', D: 'Yaşlılara saygı duyulmasını' },
    correctOption: 'B',
    category: 'Türkçe & Atasözleri',
    explanation: 'İnsanların küçük yaşlarda çok daha kolay eğitilip şekillendirilebileceğini anlatır.'
  },

  // ==================== LEVEL 4 ====================
  {
    id: 'q4_1',
    level: 4,
    text: 'Hangi Türk şehrinin plaka kodu "34"tür?',
    options: { A: 'Ankara', B: 'İzmir', C: 'Adana', D: 'İstanbul' },
    correctOption: 'D',
    category: 'Coğrafya',
    explanation: '34 plaka kodu, Türkiye\'nin en kalabalık nüfusa sahip şehri olan İstanbul\'a aittir.'
  },
  {
    id: 'q4_2',
    level: 4,
    text: 'Bitkilerin güneş ışığını kullanarak kendi besinlerini üretmesi sürecine ne ad verilir?',
    options: { A: 'Solunum', B: 'Mayalanma', C: 'Fotosentez', D: 'Buharlaşma' },
    correctOption: 'C',
    category: 'Biyoloji',
    explanation: 'Fotosentez, klorofil taşıyan canlıların ışık enerjisini kimyasal bağ enerjisine çevirmesidir.'
  },
  {
    id: 'q4_3',
    level: 4,
    text: '"Suç ve Ceza" adlı klasik romanın dünyaca ünlü Rus yazarı kimdir?',
    options: { A: 'Lev Tolstoy', B: 'Fyodor Dostoyevski', C: 'Anton Çehov', D: 'Nikolay Gogol' },
    correctOption: 'B',
    category: 'Edebiyat',
    explanation: 'Raskolnikov karakterinin vicdan azabını anlatan Suç ve Ceza, Dostoyevski\'nin başyapıtıdır.'
  },
  {
    id: 'q4_4',
    level: 4,
    text: 'Pas rengi kırmızımsı yüzeyi nedeniyle "Kızıl Gezegen" olarak da adlandırılan komşu gezegen hangisidir?',
    options: { A: 'Venüs', B: 'Jüpiter', C: 'Mars', D: 'Neptün' },
    correctOption: 'C',
    category: 'Gökbilim',
    explanation: 'Mars, zengin demir oksit içeren zemininden ötürü kızıl renkte görünür.'
  },
  {
    id: 'q4_5',
    level: 4,
    text: 'Türkiye Cumhuriyeti ve Kuzey Kıbrıs Türk Cumhuriyeti\'nin İstiklal Marşı\'nın şairi kimdir?',
    options: { A: 'Yahya Kemal Beyatlı', B: 'Mehmet Akif Ersoy', C: 'Namık Kemal', D: 'Ziya Gökalp' },
    correctOption: 'B',
    category: 'Edebiyat / Tarih',
    explanation: 'İstiklal Marşı, Mehmet Akif Ersoy tarafından 1921 yılında Ankara\'da yazılmıştır.'
  },
  {
    id: 'q4_6',
    level: 4,
    text: 'Dünyanın en yüksek kesintisiz şelalesi olan ünlü Angel (Melek) Şelalesi hangi ülkededir?',
    options: { A: 'Brezilya', B: 'Venezuela', C: 'Amerika Birleşik Devletleri', D: 'Kanada' },
    correctOption: 'B',
    category: 'Coğrafya',
    explanation: 'Angel Şelalesi, Venezuela sınırları içerisinde yer alan 979 metrelik devasa bir şelaledir.'
  },
  {
    id: 'q4_7',
    level: 4,
    text: 'Google, Yahoo, Bing gibi sitelerin temel işlevi nedir?',
    options: { A: 'İşletim sistemi olmak', B: 'İnternet arama motoru olmak', C: 'Resim düzenlemek', D: 'Metin belgesi yazmak' },
    correctOption: 'B',
    category: 'Teknoloji',
    explanation: 'Web sitelerindeki bilgileri ve içerikleri tarayan, kullanıcı aramalarına göre listeleyen motorlardır.'
  },

  // ==================== LEVEL 5 ====================
  {
    id: 'q5_1',
    level: 5,
    text: 'Tarihte ilk yazılı kanunlar olarak bilinen ve "Göze göz, dişe diş" esasına dayanan kanunlar hangi hükümdara aittir?',
    options: { A: 'Hammurabi', B: 'Sezar', C: 'Büyük İskender', D: 'Ramses' },
    correctOption: 'A',
    category: 'Tarih',
    explanation: 'Babil Kralı Hammurabi tarafından M.Ö. 1750 civarında derlenen Hammurabi Kanunları oldukça sert kısas cezaları içerir.'
  },
  {
    id: 'q5_2',
    level: 5,
    text: 'Hangi kıta tamamen Güney Yarımküre\'dedir ve hiçbir ülkeyle kara sınırı olmayan ada kıtadır?',
    options: { A: 'Afrika', B: 'Avustralya', C: 'Asya', D: 'Güney Amerika' },
    correctOption: 'B',
    category: 'Coğrafya',
    explanation: 'Avustralya hem bir kıta hem de bir ada ülkesi olup, tamamen Güney Yarımküre\'de yer alır.'
  },
  {
    id: 'q5_3',
    level: 5,
    text: 'Klasik müzikte "9. Senfoni"yi bestelerken tamamen sağır olduğu bilinen dahi besteci kimdir?',
    options: { A: 'Wolfgang Amadeus Mozart', B: 'Johann Sebastian Bach', C: 'Ludwig van Beethoven', D: 'Pyotr İlyiç Çaykovski' },
    correctOption: 'C',
    category: 'Müzik & Sanat',
    explanation: 'Beethoven işitme yetisini tamamen kaybetmesine rağmen, zihnindeki mükemmel nota duyumuyla 9. Senfoni\'yi bestelemiştir.'
  },
  {
    id: 'q5_4',
    level: 5,
    text: 'Dünyanın kendi ekseni etrafındaki bir tam dönüşünü tamamladığı süre yani "bir gün" kaç saate eşittir?',
    options: { A: '12', B: '24', C: '48', D: '60' },
    correctOption: 'B',
    category: 'Gökbilim',
    explanation: 'Dünya kendi ekseni etrafında 24 saatte (tam olarak 23 saat 56 dakika 4 saniye) bir tur döner.'
  },
  {
    id: 'q5_5',
    level: 5,
    text: 'Aşağıda belirtilen ülkelerden hangisi Türkiye\'nin kara sınır komşularından biri değildir?',
    options: { A: 'Irak', B: 'Gürcistan', C: 'İtalya', D: 'Yunanistan' },
    correctOption: 'C',
    category: 'Coğrafya',
    explanation: 'İtalya bir Akdeniz ülkesidir ancak Türkiye ile herhangi bir kara sınırı bulunmamaktadır.'
  },
  {
    id: 'q5_6',
    level: 5,
    text: 'Manyetik yön bulma aracı olan bir pusulada, serbestçe dönen kırmızı renkli iğnenin ucu her zaman hangi yönü gösterir?',
    options: { A: 'Kuzey', B: 'Güney', C: 'Doğu', D: 'Batı' },
    correctOption: 'A',
    category: 'Fizik / Genel Kültür',
    explanation: 'Pusula iğnesinin kuzey ucu, Dünya\'nın coğrafi kuzeyine (manyetik güney kutbuna) yönelir.'
  },
  {
    id: 'q5_7',
    level: 5,
    text: 'Sıvı haldeki suyun, deniz seviyesinde (1 atmosfer basınçta) kaynama sıcaklığı kaç santigrat derecedir?',
    options: { A: '50', B: '100', C: '150', D: '200' },
    correctOption: 'B',
    category: 'Fizik / Kimya',
    explanation: 'Saf su, standart deniz basıncında tam olarak 100 °C\'de kaynamaya başlar.'
  },

  // ==================== LEVEL 6 ====================
  {
    id: 'q6_1',
    level: 6,
    text: 'Yüzölçümü bakımından dünyanın en büyük ülkesi aşağıdakilerden hangisidir?',
    options: { A: 'Kanada', B: 'Amerika Birleşik Devletleri', C: 'Çin', D: 'Rusya' },
    correctOption: 'D',
    category: 'Coğrafya',
    explanation: 'Rusya, yaklaşık 17.1 million kilometrekarelik yüzölçümüyle dünyanın en büyük ülkesidir.'
  },
  {
    id: 'q6_2',
    level: 6,
    text: 'İlk kez 1896 yılında modern haliyle Atina\'da düzenlenen, dünya çapındaki bu büyük spor organizasyonu nedir?',
    options: { A: 'FIFA Dünya Kupası', B: 'Olimpiyat Oyunları', C: 'Wimbledon Tenis Turnuvası', D: 'Formula 1' },
    correctOption: 'B',
    category: 'Spor Tarihi',
    explanation: 'Modern Olimpiyatlar, antik çağlardaki oyunlardan esinlenerek Pierre de Coubertin öncülüğünde 1896\'da Atina\'da başlamıştır.'
  },
  {
    id: 'q6_3',
    level: 6,
    text: 'Kimyasal formülü H2O olan ve yaşamın devamı için en kritik öneme sahip bileşik hangisidir?',
    options: { A: 'Tuz', B: 'Su', C: 'Karbondioksit', D: 'Alkol' },
    correctOption: 'B',
    category: 'Kimya',
    explanation: 'İki Hidrojen ve bir Oksijen atomunun birleşmesiyle oluşan su, tüm canlı organizmalar için yaşamsal sıvıdır.'
  },
  {
    id: 'q6_4',
    level: 6,
    text: 'Türkiye Cumhuriyeti\'nin idari başkenti olan ilimiz hangisidir?',
    options: { A: 'İstanbul', B: 'İzmir', C: 'Ankara', D: 'Bursa' },
    correctOption: 'C',
    category: 'Coğrafya / Cumhuriyet Tarihi',
    explanation: 'Ankara, 13 Ekim 1923 tarihinde Türkiye Cumhuriyeti\'nin yasal başkenti ilan edilmiştir.'
  },
  {
    id: 'q6_5',
    level: 6,
    text: 'Türk edebiyatının önemli eserlerinden olan "Sinekli Bakkal" romanının yazarı kimdir?',
    options: { A: 'Halide Edib Adıvar', B: 'Reşat Nuri Güntekin', C: 'Peyami Safa', D: 'Orhan Kemal' },
    correctOption: 'A',
    category: 'Edebiyat',
    explanation: 'Sinekli Bakkal romancı ve siyasetçi Halide Edib Adıvar\'ın en ünlü sosyo-kültürel eserlerinden biridir.'
  },
  {
    id: 'q6_6',
    level: 6,
    text: 'Güneş Sistemi\'nde Güneş yıldızına konum olarak en yakın mesafede bulunan gezegen hangisidir?',
    options: { A: 'Venüs', B: 'Merkür', C: 'Dünya', D: 'Mars' },
    correctOption: 'B',
    category: 'Gökbilim',
    explanation: 'Merkür, Güneş\'e ortalama 58 milyon kilometre ile en yakın gezegendir.'
  },
  {
    id: 'q6_7',
    level: 6,
    text: '"İki karpuz bir koltuğa sığmaz" atasözüyle genel olarak anlatılmak istenen nedir?',
    options: { A: 'Aynı anda iki büyük işi başarmanın imkansızlığı', B: 'Manavcıların hileleri', C: 'Mobilyaların yetersiz kol büyüklüğü', D: 'Karpuz meyvesinin kaygan yapısı' },
    correctOption: 'A',
    category: 'Türkçe & Atasözleri',
    explanation: 'İnsanın gücünün sınırlı olduğunu ve aynı anda iki önemli ve ağır işi birden tam yapamayacağını belirtir.'
  },

  // ==================== LEVEL 7 ====================
  {
    id: 'q7_1',
    level: 7,
    text: 'Osmanlı İmparatorluğu\'nun İstanbul\'u fethettiği ve Doğu Roma İmparatorluğu\'na son verdiği fethin yılı hangisidir?',
    options: { A: '1071', B: '1299', C: '1453', D: '1517' },
    correctOption: 'C',
    category: 'Tarih',
    explanation: 'Fatih Sultan Mehmet komutasındaki Osmanlı ordusu, 29 Mayıs 1453 tarihinde İstanbul\'u fethetmiştir.'
  },
  {
    id: 'q7_2',
    level: 7,
    text: 'Telefon patentini 1876 yılında alarak iletişim tarihinde devrim yaratan mucit kimdir?',
    options: { A: 'Thomas Edison', B: 'Alexander Graham Bell', C: 'Nikola Tesla', D: 'Guglielmo Marconi' },
    correctOption: 'B',
    category: 'Bilim & Teknoloji',
    explanation: 'Graham Bell, ses tellerinin titreşimini elektrik akımına dönüştürerek çalışan ilk telefonu icat etmiştir.'
  },
  {
    id: 'q7_3',
    level: 7,
    text: 'Asal sayılar zincirinde, çift olan tek asal sayı hangisidir?',
    options: { A: '0', B: '1', C: '2', D: '3' },
    correctOption: 'C',
    category: 'Matematik',
    explanation: '2 sayısı, hem en küçük asal sayıdır hem de çift sayı olan tek asal sayıdır.'
  },
  {
    id: 'q7_4',
    level: 7,
    text: 'Bütün elementlerin yer aldığı periyodik sistem tablosunun en başında, atom numarası 1 olan hangi element bulunur?',
    options: { A: 'Helyum', B: 'Hidrojen', C: 'Oksijen', D: 'Azot' },
    correctOption: 'B',
    category: 'Kimya',
    explanation: 'Hidrojen, evrende en bol bulunan ve çekirdeğinde sadece bir proton barındıran en basit elementtir.'
  },
  {
    id: 'q7_5',
    level: 7,
    text: 'Vücudumuzda oksijenlenmiş temiz kanı tüm dokulara ve organlara pompalamakla görevli hayati organımız hangisidir?',
    options: { A: 'Akciğer', B: 'Karaciğer', C: 'Beyin', D: 'Kalp' },
    correctOption: 'D',
    category: 'Biyoloji',
    explanation: 'Kalp, kaslı yapısıyla sürekli kasılarak kanın vücutta aralıksız dolaşmasını sağlar.'
  },
  {
    id: 'q7_6',
    level: 7,
    text: 'Halkın yakından tanıdığı ünlülerin, tarihi figürlerin yaşam hikayelerini anlatan edebi eser türü hangisidir?',
    options: { A: 'Biyografi', B: 'Otobiyografi', C: 'Roman', D: 'Şiir' },
    correctOption: 'A',
    category: 'Edebiyat',
    explanation: 'Biyografi (yaşam öyküsü), bir kişinin hayatını başka bir yazarın tarafsız veya belgelere dayalı olarak anlatmasıdır.'
  },
  {
    id: 'q7_7',
    level: 7,
    text: 'Cumhuriyetimizin kuruculuğunu simgeleyen coşkulu "Onuncu Yıl Marşı"nın ünlü Türk bestecisi kimdir?',
    options: { A: 'Cemal Reşit Rey', B: 'Ahmet Adnan Saygun', C: 'Ulvi Cemal Erkin', D: 'Necil Kazım Akses' },
    correctOption: 'A',
    category: 'Müzik Tarihi',
    explanation: 'Onuncu Yıl Marşı, Cemal Reşit Rey tarafından bestelenmiştir; sözleri Behçet Kemal Çağlar ve Faruk Nafiz Çamlıbel\'e aittir.'
  },

  // ==================== LEVEL 8 ====================
  {
    id: 'q8_1',
    level: 8,
    text: 'Rönesans döneminin dahi ismi Leonardo da Vinci\'nin Paris\'teki Louvre Müzesi\'nde sergilenen ünlü tablosu hangisidir?',
    options: { A: 'Yıldızlı Gece', B: 'Mona Lisa', C: 'Belleğin Azmi', D: 'İnci Küpeli Kız' },
    correctOption: 'B',
    category: 'Resim / Sanat',
    explanation: 'Mona Lisa (La Gioconda), gizemli gülümsemesi ve dünyaca ünlü sfumato tekniğiyle Louvre müzesinin gözbebeğidir.'
  },
  {
    id: 'q8_2',
    level: 8,
    text: 'Türkiye\'nin en yüksek dağı olan Ağrı Dağı\'nın zirvesi deniz seviyesinden yaklaşık kaç metre yüksekliktedir?',
    options: { A: '3917 m', B: '4810 m', C: '5137 m', D: '5671 m' },
    correctOption: 'C',
    category: 'Coğrafya',
    explanation: 'Ağrı Dağı (Ararat), 5.137 metrelik yüksekliği ile Türkiye ve Anadolu\'nun en yüksek zirvesidir.'
  },
  {
    id: 'q8_3',
    level: 8,
    text: 'Güneş sistemindeki en büyük gezegen olan ve devasa "Büyük Kırmızı Leke" fırtınasıyla bilinen gaz devi hangisidir?',
    options: { A: 'Satürn', B: 'Uranüs', C: 'Neptün', D: 'Jüpiter' },
    correctOption: 'D',
    category: 'Gökbilim',
    explanation: 'Jüpiter, Güneş Sistemi\'nin en büyük gezegenidir ve içine 1300 adet Dünya sığabilir.'
  },
  {
    id: 'q8_4',
    level: 8,
    text: 'Truva Muharebesi sırasında, Truva kalesine sızmak amacıyla tahta bir at inşa etme dahi fikrini ortaya atan Akhalı kral kimdir?',
    options: { A: 'Achilles (Aşil)', B: 'Odysseus', C: 'Agamemnon', D: 'Menelaus' },
    correctOption: 'B',
    category: 'Mitoloji',
    explanation: 'Zekası ve kurnazlığıyla tanınan İtaka Kralı Odysseus Truva Atı fikrini yaratarak savaşı bitirmiştir.'
  },
  {
    id: 'q8_5',
    level: 8,
    text: 'İslam, Hristiyanlık ve Musevilik dinlerinin üçü için de son derece mukaddes ve kutsal kabul edilen kadim şehir hangisidir?',
    options: { A: 'Kahire', B: 'Şam', C: 'Kudüs', D: 'Beyrut' },
    correctOption: 'C',
    category: 'Tarih / Din Kültürü',
    explanation: 'Kudüs; Mescid-i Aksa, Ağlama Duvarı ve Kutsal Kabir Kilisesi gibi her üç dinin kutsal mabetlerine ev sahipliği yapar.'
  },
  {
    id: 'q8_6',
    level: 8,
    text: 'Reşat Nuri Güntekin\'in dünyaca ünlü klasiği "Çalıkuşu" romanındaki ana karakter Feride\'nin asıl mesleği nedir?',
    options: { A: 'Doktor', B: 'Avukat', C: 'Öğretmen', D: 'Ziraat Mühendisi' },
    correctOption: 'C',
    category: 'Edebiyat',
    explanation: 'Feride, nişanlısı Kamran\'ı terk ettikten sonra Anadolu\'ya giderek öğretmenlik yapmaya başlar.'
  },
  {
    id: 'q8_7',
    level: 8,
    text: 'DNA onarımı üzerine yaptığı çığır açıcı çalışmalarıyla 2015 Nobel Kimya Ödülü\'ne layık görülen Türk bilim insanımız kimdir?',
    options: { A: 'Cahit Arf', B: 'Aziz Sancar', C: 'Oktay Sinanoğlu', D: 'Muzaffer Aksoy' },
    correctOption: 'B',
    category: 'Bilim Tarihi',
    explanation: 'Prof. Dr. Aziz Sancar, hücrelerin hasar gören DNA\'ları nasıl onardığını haritalandırarak Nobel Ödülü kazanmıştır.'
  },

  // ==================== LEVEL 9 ====================
  {
    id: 'q9_1',
    level: 9,
    text: 'Fransa ile İngiltere\'yi deniz altından birbirine bağlayan, Manş Denizi altındaki ünlü demiryolu tünelinin adı nedir?',
    options: { A: 'Manş Tüneli', B: 'Eurotunnel', C: 'Manhattan Tüneli', D: 'Cebelitarık Geçidi' },
    correctOption: 'B',
    category: 'Genel Kültür / Mühendislik',
    explanation: 'İngiltere ve Fransa\'yı birbirine bağlayan Eurotunnel (Manş Tüneli), dünyanın en uzun deniz altı tünellerinden biridir.'
  },
  {
    id: 'q9_2',
    level: 9,
    text: 'Kan dolaşımını keşfeden ve modern fizyolojinin babası sayılan 17. yüzyıl İngiliz hekimi kimdir?',
    options: { A: 'Louis Pasteur', B: 'William Harvey', C: 'Robert Koch', D: 'Edward Jenner' },
    correctOption: 'B',
    category: 'Tıp Tarihi',
    explanation: 'William Harvey, 1628 yılında kalbin bir pompa gibi çalıştığını ve kanın vücutta dolaştığını bilimsel olarak kanıtlamıştır.'
  },
  {
    id: 'q9_3',
    level: 9,
    text: 'Kuzey Avrupa\'da fiyortları, gece güneşi ve Viking kültürüyle ünlü, başkenti Oslo olan İskandinav ülkesi hangisidir?',
    options: { A: 'İsveç', B: 'Finlandiya', C: 'Norveç', D: 'Danimarka' },
    correctOption: 'C',
    category: 'Coğrafya',
    explanation: 'Norveç Krallığı, muazzam fiyort kıyıları ve kutup dairesine yakın coğrafyasıyla bilinir.'
  },
  {
    id: 'q9_4',
    level: 9,
    text: 'İçinde ünlü Türk Marşı\'nı (Rondo alla Turca) da barındıran klasik "Saraydan Kız Kaçırma" operasının dünyaca ünlü bestecisi kimdir?',
    options: { A: 'Ludwig van Beethoven', B: 'Wolfgang Amadeus Mozart', C: 'Johann Sebastian Bach', D: 'Antonio Vivaldi' },
    correctOption: 'B',
    category: 'Klasik Müzik',
    explanation: 'Mozart, döneminin oryantalist esintilerinden etkilenerek bu operayı ve ünlü Türk Marşı piyano sonatını bestelemiştir.'
  },
  {
    id: 'q9_5',
    level: 9,
    text: '"Düşünüyorum, öyleyse varım" (Cogito, ergo sum) ifadesiyle rasyonalist felsefenin temelini atan ünlü Fransız düşünür kimdir?',
    options: { A: 'Socrates', B: 'René Descartes', C: 'Immanuel Kant', D: 'Friedrich Nietzsche' },
    correctOption: 'B',
    category: 'Felsefe',
    explanation: 'Descartes, her şeyden kuşku duyabileceğini ancak şüphe eden kendi varlığından kuşku duyamayacağını söyleyerek bu çıkarımı yapmıştır.'
  },
  {
    id: 'q9_6',
    level: 9,
    text: 'Mimar Sinan\'ın her ayrıntısıyla hayranlık uyandıran ve "Ustalık Eserim" olarak nitelediği, Edirne ilimizde yer alan yapı hangisidir?',
    options: { A: 'Süleymaniye Camii', B: 'Selimiye Camii', C: 'Şehzade Camii', D: 'Sultanahmet Camii' },
    correctOption: 'B',
    category: 'Mimarlık / Sanat',
    explanation: 'Selimiye Camii, geniş kubbesi, ince minareleri ve iç çini süslemeleri ile Sinan\'ın dehasını temsil eder.'
  },
  {
    id: 'q9_7',
    level: 9,
    text: 'Deniz seviyesinden en yüksek nokta olan Everest Dağı (8.848 m) hangi iki ülkenin sınır bölgesindedir?',
    options: { A: 'Nepal - Çin', B: 'Hindistan - Pakistan', C: 'Çin - Moğolistan', D: 'Rusya - Kazakistan' },
    correctOption: 'A',
    category: 'Coğrafya',
    explanation: 'Everest Dağı, Asya\'da Himalayalar sıradağlarında yer almakta olup, Nepal ile Çin (Tibet) sınır çizgisi üzerindedir.'
  },

  // ==================== LEVEL 10 ====================
  {
    id: 'q10_1',
    level: 10,
    text: 'Aşağıdaki Nobel ödüllü bilim insanlarından hangisi, iki farklı bilim dalında (Kimya ve Fizik) Nobel ödülü kazanmış tek kişidir?',
    options: { A: 'Albert Einstein', B: 'Marie Curie', C: 'Richard Feynman', D: 'Linus Pauling' },
    correctOption: 'B',
    category: 'Bilim Tarihi',
    explanation: 'Marie Curie, 1903\'te Fizik alanında ve 1911\'de Kimya alanında aldığı iki ayrı ödülle bilim tarihine geçmiştir.'
  },
  {
    id: 'q10_2',
    level: 10,
    text: 'Hangi ünlü antik uygarlık, Nil Nehri kıyısında kurulmuş ve Hiyeroglif yazısını kullanıp Piramitler inşa etmiştir?',
    options: { A: 'Sümerler', B: 'Aztekler', C: 'Antik Mısır', D: 'Babiller' },
    correctOption: 'C',
    category: 'Tarih',
    explanation: 'Antik Mısır, tarımını Nil Nehri taşkınlarına göre ayarlayan ve mumyalama gibi tıp harikalarına imza atan bir medeniyetti.'
  },
  {
    id: 'q10_3',
    level: 10,
    text: 'İtalyan şair Dante Alighieri\'nin, Cehennem, Araf ve Cennet aşamalarından oluşan ünlü epik şiir başyapıtı hangisidir?',
    options: { A: 'İlahi Komedya', B: 'Odysseia', C: 'Kayıp Cennet', D: 'Gılgamış' },
    correctOption: 'A',
    category: 'Edebiyat',
    explanation: 'İlahi Komedya, İtalyan edebiyatının en büyük eseri kabul edilir ve Hristiyanlık inancındaki ahiret yolculuğunu alegorik anlatır.'
  },
  {
    id: 'q10_4',
    level: 10,
    text: 'Havadan hafif olan ve kimyasal uyuşmazlığı nedeniyle son derece güvenli olan hangi gaz, uçan balonları şişirmede kullanılır?',
    options: { A: 'Karbondioksit', B: 'Helyum', C: 'Argon', D: 'Klor' },
    correctOption: 'B',
    category: 'Kimya',
    explanation: 'Helyum, soygazdır ve yanıcı/patlayıcı olmadığı için uçan balonlar ve zeplinlerde hidrojen yerine tercih edilir.'
  },
  {
    id: 'q10_5',
    level: 10,
    text: '"Kar", "Masumiyet Müzesi" ve "Benim Adım Kırmızı" kitaplarıyla bilinen, Türkiye\'nin Nobel Edebiyat Ödüllü tek yazarı kimdir?',
    options: { A: 'Yaşar Kemal', B: 'Orhan Pamuk', C: 'Sabahattin Ali', D: 'Ahmet Hamdi Tanpınar' },
    correctOption: 'B',
    category: 'Edebiyat',
    explanation: 'Orhan Pamuk, 2006 yılında İsveç Akademisi tarafından Nobel Edebiyat Ödülü\'ne layık görülmüştür.'
  },
  {
    id: 'q10_6',
    level: 10,
    text: 'Dünyadaki ilk askeri kadın savaş uçağı pilotu unvanına sahip olan Cumhuriyetimizin öncü kadını kimdir?',
    options: { A: 'Sabiha Gökçen', B: 'Afet İnan', C: 'Ülkü Adatepe', D: 'Muazzez İlmiye Çığ' },
    correctOption: 'A',
    category: 'Tarih / Cumhuriyet',
    explanation: 'Atatürk\'ün manevi kızı olan Sabiha Gökçen, 1937 yılında askeri uçuş eğitimlerini başarıyla tamamlamıştır.'
  },
  {
    id: 'q10_7',
    level: 10,
    text: 'Yüzölçümü bakımından dünyadaki en büyük subtropikal "sıcak çöl" olma özelliğine sahip kurak bölge hangisidir?',
    options: { A: 'Gobi Çölü', B: 'Sahra Çölü', C: 'Kalahari Çölü', D: 'Atacama Çölü' },
    correctOption: 'B',
    category: 'Coğrafya',
    explanation: 'Kuzey Afrika\'nın büyük kısmını kaplayan Büyük Sahra Çölü, yaklaşık 9 milyon kilometrekarelik bir alana yayılmaktadır.'
  },

  // ==================== LEVEL 11 ====================
  {
    id: 'q11_1',
    level: 11,
    text: 'Dünyanın en derin noktası olan ve Büyük Okyanus\'ta bulunan çukurun adı nedir?',
    options: { A: 'Puerto Rico Çukuru', B: 'Mariana Çukuru', C: 'Java Çukuru', D: 'Tonga Çukuru' },
    correctOption: 'B',
    category: 'Coğrafya / Okyanusbilim',
    explanation: 'Mariana Çukuru yaklaşık 11.000 metrelik derinliği ile yeryüzünün bilinen en derin noktasıdır.'
  },
  {
    id: 'q11_2',
    level: 11,
    text: '1912 yılında ilk seferinde bir buzdağına çarparak batan İngiliz yolcu gemisi Titanic, hangi okyanusta batmıştır?',
    options: { A: 'Pasifik Okyanusu', B: 'Atlas Okyanusu (Atlantik)', C: 'Hint Okyanusu', D: 'Arktik Okyanusu' },
    correctOption: 'B',
    category: 'Tarih',
    explanation: 'Titanic, İngiltere\'nin Southampton limanından New York\'a giderken Kuzey Atlantik\'te buzdağına çarpmıştır.'
  },
  {
    id: 'q11_3',
    level: 11,
    text: 'Işık hızı boşlukta saniyede yaklaşık kaç kilometredir?',
    options: { A: '150.000 km/s', B: '300.000 km/s', C: '500.000 km/s', D: '1.000.000 km/s' },
    correctOption: 'B',
    category: 'Fizik',
    explanation: 'Işık hızı boşlukta tam olarak 299.792.458 m/s olup, yuvarlak hesap saniyede 300.000 km olarak kabul edilir.'
  },
  {
    id: 'q11_4',
    level: 11,
    text: 'Kopernik teorisini destekleyen ve Jüpiter\'in uydularını kendi yaptığı merceklerle gözlemleyen ünlü İtalyan astronom kimdir?',
    options: { A: 'Johannes Kepler', B: 'Galileo Galilei', C: 'Isaac Newton', D: 'Giordano Bruno' },
    correctOption: 'B',
    category: 'Gökbilim',
    explanation: 'Galileo, Hollandalı gözlükçülerin buluşundan esinlenip gökyüzü teleskobunu geliştirerek modern gökbilimi başlatmıştır.'
  },
  {
    id: 'q11_5',
    level: 11,
    text: 'Karadeniz iç denizini, Marmara Denizi ile fiziki olarak birbirine bağlayan dünya çapındaki stratejik su geçidinin adı nedir?',
    options: { A: 'Çanakkale Boğazı', B: 'İstanbul Boğazı', C: 'Süveyş Kanalı', D: 'Cebelitarık Boğazı' },
    correctOption: 'B',
    category: 'Coğrafya',
    explanation: 'İstanbul Boğazı, Asya ve Avrupa kıtalarını birbirinden ayıran doğal bir su yoludur.'
  },
  {
    id: 'q11_6',
    level: 11,
    text: 'Batı dünyasında "Muhteşem" (The Magnificent) unvanıyla, Doğu\'da ise adil yasaları nedeniyle "Kanuni" olarak anılan Osmanlı Padişahı kimdir?',
    options: { A: 'Fatih Sultan Mehmet', B: 'Kanuni Sultan Süleyman', C: 'Yavuz Sultan Selim', D: 'İkinci Abdülhamid' },
    correctOption: 'B',
    category: 'Tarih',
    explanation: 'I. Süleyman, 46 yıllık saltanatıyla Osmanlı tarihinin en uzun süre tahtta kalan imparatorudur.'
  },
  {
    id: 'q11_7',
    level: 11,
    text: 'Ökaryotik hücre bölünmesi (mitoz) sırasında, iğ ipliklerinin oluşumunu koordine ederek kromozomları kutuplara çeken organel hangisidir?',
    options: { A: 'Sentrozom', B: 'Ribozom', C: 'Kloroplast', D: 'Koful' },
    correctOption: 'A',
    category: 'Biyoloji',
    explanation: 'Sentrozom hücre bölünmesinde kendini eşleyerek zıt kutuplara gider ve mikrotübülleri çekerek kromozom ayrılmasını sağlar.'
  },

  // ==================== LEVEL 12 ====================
  {
    id: 'q12_1',
    level: 12,
    text: 'Mona Lisa\'yı çalmasıyla da bir dönem ün kazanan, 19. yüzyılın sonlarında ortaya çıkmış, "Kübist" akımın kurucusu İspanyol ressam kimdir?',
    options: { A: 'Salvador Dali', B: 'Pablo Picasso', C: 'Vincent van Gogh', D: 'Claude Monet' },
    correctOption: 'B',
    category: 'Resim / Sanat Akımları',
    explanation: 'Pablo Picasso, Georges Braque ile birlikte nesneleri geometrik şekillerle çok boyutlu gösteren Kübizm akımını kurmuştur.'
  },
  {
    id: 'q12_2',
    level: 12,
    text: 'Hücre içinde enerji üretiminden sorumlu olan ve "hücrenin santrali" olarak da adlandırılan organel hangisidir?',
    options: { A: 'Ribozom', B: 'Lizozom', C: 'Mitokondri', D: 'Golgi Aygıtı' },
    correctOption: 'C',
    category: 'Biyoloji',
    explanation: 'Mitokondri, oksijenli solunum yaparak hücrenin ana enerji birimi olan ATP moleküllerini üretir.'
  },
  {
    id: 'q12_3',
    level: 12,
    text: 'İkinci Dünya Savaşı sırasında ABD\'nin düzenlediği "Manhattan Projesi"nin bilimsel liderliğini yapan ünlü fizikçi kimdir?',
    options: { A: 'Robert Oppenheimer', B: 'Niels Bohr', C: 'Enrico Fermi', D: 'Albert Einstein' },
    correctOption: 'A',
    category: 'Tarih & Bilim',
    explanation: 'J. Robert Oppenheimer, Los Alamos Laboratuvarı\'nda ilk atom bombasının geliştirilmesine liderlik etmiştir.'
  },
  {
    id: 'q12_4',
    level: 12,
    text: 'İnsan vücudunun en dış katmanlarında yer alan, vücuttaki en sert ve kalsiyum minerali bakımından en yoğun doku hangisidir?',
    options: { A: 'Kemik dokusu', B: 'Kıkırdak', C: 'Eklemler', D: 'Diş minesi' },
    correctOption: 'D',
    category: 'Tıp & Anatomi',
    explanation: 'Diş minesi (enamelum), vücuttaki en yüksek mineral seviyesine sahip, kemikten bile daha sert olan koruyucu tabakadır.'
  },
  {
    id: 'q12_5',
    level: 12,
    text: 'Klasik yönetim ve kişisel gelişim kitabı "Kendi Kutup Yıldızını Bul" adlı eseriyle bilinen ünlü Türk yazar ve eğitimci kimdir?',
    options: { A: 'Nüvit Osmay', B: 'Doğan Cüceloğlu', C: 'Üstün Dökmen', D: 'İlber Ortaylı' },
    correctOption: 'A',
    category: 'Edebiyat / Kişisel Gelişim',
    explanation: 'Nüvit Osmay\'ın "Kendi Kutup Yıldızını Bul" kitabı, nesiller boyu insanların kendilerini geliştirmesi üzerine adanmış bir klasiktir.'
  },
  {
    id: 'q12_6',
    level: 12,
    text: 'Gözün arkasında konumlanan, ışığa karşı duyarlı fotoreseptör hücreleri barındıran ve görüntüyü beyne ulaştıran tabaka hangisidir?',
    options: { A: 'Kornea', B: 'Retina (Ağ Tabaka)', C: 'İris', D: 'Göz bebeği' },
    correctOption: 'B',
    category: 'Biyoloji',
    explanation: 'Retina, ışık sinyallerini elektrik akımlarına dönüştürerek optik sinir kanalıyla görme merkezine iletir.'
  },
  {
    id: 'q12_7',
    level: 12,
    text: 'Havacılık tarihinde ilk pratik ve seri üretime uygun tek rotorlu helikopteri (VS-300) tasarlayan Rus asıllı mühendis kimdir?',
    options: { A: 'Igor Sikorsky', B: 'William Boeing', C: 'Wright Kardeşler', D: 'Nikola Tesla' },
    correctOption: 'A',
    category: 'Mühendislik Tarihi',
    explanation: 'Sikorsky, 1939 yılında üç kanatlı tek rotor tasarımını başarıyla uçurmuş ve bugünkü helikopter sistemlerinin temelini atmıştır.'
  },

  // ==================== LEVEL 13 ====================
  {
    id: 'q13_1',
    level: 13,
    text: 'Sanat tarihinin en gizemli eserlerinden "Guernica" tablosu, hangi tarihi olayı tasvir etmektedir?',
    options: { A: 'Fransız İhtilali', B: 'İspanya İç Savaşı\'ndaki bir bombardımanı', C: 'İstanbul\'un Kuşatılmasını', D: 'Napolyon\'un Rusya Seferini' },
    correctOption: 'B',
    category: 'Sanat Tarihi',
    explanation: 'Picasso\'nun anıtsal tablosu Guernica, Alman ve İtalyan uçaklarının İspanya İç Savaşı sırasında Guernica kasabasını bombalamasını anlatır.'
  },
  {
    id: 'q13_2',
    level: 13,
    text: 'Yunan mitolojisinde, "Kendi yansımasına aşık olup" eriyerek bir çiçeğe dönüşen ve narsisizm terimine adını veren kahraman kimdir?',
    options: { A: 'Adonis', B: 'İkarus', C: 'Narkissos', D: 'Midas' },
    correctOption: 'C',
    category: 'Mitoloji',
    explanation: 'Sudaki yansımasını görerek kendine aşık olan ve ömrünü onu izleyerek tüketen Narkissos, nergis çiçeğine (Narcissus) dönüşmüştür.'
  },
  {
    id: 'q13_3',
    level: 13,
    text: 'Elementlerin periyodik tablosunu ilk kez sistemli bir şekilde 1869 yılında yayımlayan Rus kimyager kimdir?',
    options: { A: 'Antoine Lavoisier', B: 'Dmitri Mendeleyev', C: 'John Dalton', D: 'Alfred Nobel' },
    correctOption: 'B',
    category: 'Kimya',
    explanation: 'Mendeleyev, elementleri atom kütlelerine göre dizip henüz keşfedilmemiş elementler için periyodik tabloda boşluklar bırakmıştır.'
  },
  {
    id: 'q13_4',
    level: 13,
    text: 'Bilgisayar ve televizyon ekranlarındaki tüm dijital renk piksellerini oluşturmada kullanılan üç ana ışık rengi (RGB) hangisidir?',
    options: { A: 'Kırmızı, Yeşil, Mavi', B: 'Sarı, Kırmızı, Mavi', C: 'Kırmızı, Turuncu, Mor', D: 'Siyah, Beyaz, Gri' },
    correctOption: 'A',
    category: 'Teknoloji / Optik',
    explanation: 'RGB (Red, Green, Blue) aditif renk modelinde bu üç ışığın farklı oranlarda birleşmesiyle milyonlarca renk tonu elde edilir.'
  },
  {
    id: 'q13_5',
    level: 13,
    text: '1215 yılında ilan edilen ve dünya tarihinde kralın yetkilerini yasal olarak ilk kez sınırlayan Magna Carta sözleşmesi hangi ülkede imzalanmıştır?',
    options: { A: 'Fransa', B: 'İngiltere', C: 'Almanya', D: 'İspanya' },
    correctOption: 'B',
    category: 'Tarih',
    explanation: 'Kral Yurtsuz John tarafından imzalanan Magna Carta (Büyük Sözleşme), modern anayasal hakların başlangıcı sayılır.'
  },
  {
    id: 'q13_6',
    level: 13,
    text: '1953 yılında DNA molekülünün çift sarmallı (Double Helix) yapısını keşfederek tıp dünyasında çığır açan ünlü bilim ikilisi kimdir?',
    options: { A: 'James Watson - Francis Crick', B: 'Frederick Banting - Charles Best', C: 'Alexander Fleming - Howard Florey', D: 'Marie Curie - Pierre Curie' },
    correctOption: 'A',
    category: 'Biyoloji Tarihi',
    explanation: 'Rosalind Franklin\'in X-ışını kırınımı fotoğraflarından esinlenen Watson ve Crick, DNA sarmal yapısını modelediler ve Nobel aldılar.'
  },
  {
    id: 'q13_7',
    level: 13,
    text: 'İçerisinde modern asansör teknolojileri barındıran, 828 metrelik yüksekliği ile dünyanın en yüksek binası Burj Khalifa hangi şehirdedir?',
    options: { A: 'Riyad', B: 'Katar', C: 'Dubai', D: 'Abu Dabi' },
    correctOption: 'C',
    category: 'Mimarlık / Coğrafya',
    explanation: 'Burj Khalifa, Birleşik Arap Emirlikleri\'nin Dubai kentinde 2010 yılında açılmış ultra yüksek gökdelendir.'
  },

  // ==================== LEVEL 14 ====================
  {
    id: 'q14_1',
    level: 14,
    text: 'Dünyanın en uzun nehridir ancak Amazon Nehri ile uzunluk tartışması sürmektedir. Akdeniz\'e dökülen bu nehir hangisidir?',
    options: { A: 'Nil Nehri', B: 'Ganj Nehri', C: 'Debre Nehri', D: 'Mississippi' },
    correctOption: 'A',
    category: 'Coğrafya',
    explanation: 'Nil Nehri, 6.650 km uzunluğu ile geleneksel olarak dünyanın en uzun nehri kabul edilir ancak Amazon nehrinin de bazı kaynaklardaki ölçümleri buna yakındır.'
  },
  {
    id: 'q14_2',
    level: 14,
    text: 'Antik Dünya\'nın Yedi Harikası\'ndan biri olan "İskenderiye Feneri", günümüzde hangi ülkenin sınırları içindeydi?',
    options: { A: 'Yunanistan', B: 'Mısır', C: 'İtalya', D: 'Türkiye' },
    correctOption: 'B',
    category: 'Arkeoloji & Tarih',
    explanation: 'İskenderiye Feneri, antik dönemde Mısır\'ın İskenderiye şehri kıyısındaki Pharos adasında inşa edilmiş devasa bir deniz feneridir.'
  },
  {
    id: 'q14_3',
    level: 14,
    text: 'Yapar zekanın babası kabul edilen, "Makineler düşünebilir mi?" sorusunu sorarak Enigma şifresini kıran İngiliz matematikçi kimdir?',
    options: { A: 'Ada Lovelace', B: 'Alan Turing', C: 'Claude Shannon', D: 'John von Neumann' },
    correctOption: 'B',
    category: 'Bilgisayar Bilimi',
    explanation: 'Alan Turing, tasarladığı elektro-mekanik bilgisayarla İkinci Dünya Savaşı\'nda Nazi Enigma şifresini çözerek savaşı kısaltmıştır.'
  },
  {
    id: 'q14_4',
    level: 14,
    text: 'Sanayi Devrimi\'nin beşiği olan ve dünyanın ilk yer altı tren hattını (metro) 1863 yılında hayata geçiren şehir hangisidir?',
    options: { A: 'Paris', B: 'New York', C: 'Londra', D: 'Tokyo' },
    correctOption: 'C',
    category: 'Tarih / Mühendislik',
    explanation: 'Londra metrosu (The Tube), Metropolitan Railway şirketi tarafından açılan dünyanın en eski yer altı raylı taşıma ağıdır.'
  },
  {
    id: 'q14_5',
    level: 14,
    text: 'Açısal hesaplamalar ve hidrostatik prensiplerle ilgilenen, Pi sayısının değerini modern verilere çok yakın oranlayan antik daire bilgini kimdir?',
    options: { A: 'Öklid', B: 'Pisagor', C: 'Arşimet (Archimedes)', D: 'Thales' },
    correctOption: 'C',
    category: 'Matematik Tarihi',
    explanation: 'Siraküzalı Arşimet, dairenin içine ve dışına çokgenler çizerek Pi sayısının değerini 3 tam 1/7 ile 3 tam 10/71 arasında sınırlandırmıştır.'
  },
  {
    id: 'q14_6',
    level: 14,
    text: 'Kuduz patojenini inceleyen ve tarihte ilk başarılı kuduz aşısını 1885\'te bir çocuk üzerinde deneyerek tıp devrimi yapan bilim insanı kimdir?',
    options: { A: 'Robert Koch', B: 'Louis Pasteur', C: 'Alexander Fleming', D: 'Joseph Lister' },
    correctOption: 'B',
    category: 'Tıp & Bilim',
    explanation: 'Fransız kimyager ve mikrobiyolog Louis Pasteur kuduz virüsünü zayıflatarak başarılı bir aşı geliştirmiştir.'
  },
  {
    id: 'q14_7',
    level: 14,
    text: 'Hazar Denizi bir göl sayılmazsa (tuzlu havza), yüzölçümü bakımından dünyanın en büyük "tatlı su gölü" hangisidir?',
    options: { A: 'Superior Gölü', B: 'Victoria Gölü', C: 'Baykal Gölü', D: 'Michigan Gölü' },
    correctOption: 'A',
    category: 'Coğrafya',
    explanation: 'Kuzey Amerika\'daki Superior Gölü, 82.100 kilometrekarelik yüzölçümü ile dünyanın en büyük tatlı su kaplamasına sahiptir.'
  },

  // ==================== LEVEL 15 (MİLYONLUK SORU!) ====================
  {
    id: 'q15_1',
    level: 15,
    text: '1969 yılında Apollo 11 göreviyle Ay\'a ayak basan ikinci insan olan ve geri döndüğünde "Muhteşem bir ıssızlık" diyen astronot kimdir?',
    options: { A: 'Neil Armstrong', B: 'Buzz Aldrin', C: 'Michael Collins', D: 'Yuri Gagarin' },
    correctOption: 'B',
    category: 'Uzay Keşfi / Tarih',
    explanation: 'Neil Armstrong\'un hemen ardından Ay modülünden inerek Ay\'a ayak basan ikinci insan Edwin "Buzz" Aldrin\'dir.'
  },
  {
    id: 'q15_2',
    level: 15,
    text: 'Mary Shelley\'nin yazdığı ünlü Gotik korku romanı "Frankenstein"da yaratılan canavara romanda verilen asıl isim veya unvan nedir?',
    options: { A: 'Canavarın adı yoktur ve sadece "Yaratık" veya "İblis" denir', B: 'Yaratığın adı Frankenstein\'dır', C: 'Yaratığın adı Prometheus\'tur', D: 'Yaratığın adı Adam\'dır' },
    correctOption: 'A',
    category: 'Edebiyat / Klasikler',
    explanation: 'Popüler kültürün aksine, yaratığı oluşturan bilim insanının adı Victor Frankenstein\'dır; yarattığı canavarın kitaptaki resmi bir ismi yoktur, sadece "canavar", "yaratık" veya "iblis" olarak anılır.'
  },
  {
    id: 'q15_3',
    level: 15,
    text: 'Uluslararası Uzay İstasyonu (ISS) Dünya etrafındaki bir tam turunu yaklaşık olarak kaç dakikada tamamlar?',
    options: { A: '45 dakika', B: '90 dakika', C: '180 dakika', D: '360 dakika' },
    correctOption: 'B',
    category: 'Uzay Bilimleri',
    explanation: 'ISS, saatte yaklaşık 27.600 kilometre hızla hareket eder ve Dünya etrafındaki yörüngesini yaklaşık 90 (92.6) dakikada bir tamamlar.'
  },
  {
    id: 'q15_4',
    level: 15,
    text: 'Dostoyevski\'nin başyapıtı "Karamazov Kardeşler"de yer alan, üç erkek kardeşten en büyüğü olan ve aşırı tutkusallığı/duygusallığı temsil eden kardeş kimdir?',
    options: { A: 'Dmitri', B: 'İvan', C: 'Alyoşa', D: 'Smerdyakov' },
    correctOption: 'A',
    category: 'Edebiyat / Klasikler',
    explanation: 'Dmitri (Mitya) kontrolsüz tutkuları, İvan rasyonalizmi ve ateizmi, Alyoşa inancı ve ruhsal sevgiyi simgeler.'
  },
  {
    id: 'q15_5',
    level: 15,
    text: 'Periyodik tablonun en altında yer alan, atom numarası 92 olan uranyumdan sonra gelen ve tamamı radyoaktif olan yapay elementler serisi nedir?',
    options: { A: 'Lantanitler', B: 'Aktinitler', C: 'Halojenler', D: 'Soygazlar' },
    correctOption: 'B',
    category: 'Nükleer Kimya',
    explanation: 'Aktinitler, 89 (Aktinyum) ile 103 (Lavrensiyum) atom numarası arasındaki elementler olup tamamı radyoaktif özellik gösterir.'
  },
  {
    id: 'q15_6',
    level: 15,
    text: 'İkinci Dünya Savaşında şifre çözücülerin gizli üssü olan, Alan Turing önderliğinde Alman Enigma şifrelerinin kırıldığı İngiliz malikanesi neresidir?',
    options: { A: 'Bletchley Park', B: 'Greenwich Sarayı', C: 'Westminster Sarayı', D: 'Oxford Castle' },
    correctOption: 'A',
    category: 'Tarih / Bilgisayar Tarihi',
    explanation: 'Hükümet Kod ve Şifre Okulu\'na (GC&CS) ev sahipliği yapan Bletchley Park, modern kriptolojinin doğduğu yerdir.'
  },
  {
    id: 'q15_7',
    level: 15,
    text: 'İnsan beyninin temporal lobunda bulunan, uzun süreli hafızanın ve uzamsal navigasyon (yön bulma) yeteneğinin ana merkezi olan ve şekli deniz atına benzeyen bölge hangisidir?',
    options: { A: 'Amigdala', B: 'Hipokampus (Hippocampus)', C: 'Serebellum (Beyincik)', D: 'Hipotalamus' },
    correctOption: 'B',
    category: 'Nöroloji / Biyoloji',
    explanation: 'Hipokampus denizatı şeklindedir ve hafıza izlerinin konsolidasyonu ile mekan yöneliminde hayati bir öneme sahiptir.'
  }
];
