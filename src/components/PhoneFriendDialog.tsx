import { motion } from 'motion/react';
import { Phone, Check, UserCircle2 } from 'lucide-react';
import { Question, PhoneFriendSuggestion } from '../types';

interface PhoneFriendDialogProps {
  question: Question;
  onSelectFriend: (suggestion: PhoneFriendSuggestion) => void;
  onClose: () => void;
}

export default function PhoneFriendDialog({ question, onSelectFriend, onClose }: PhoneFriendDialogProps) {
  // Let's create 3 funny and helpful friends
  const friends = [
    {
      id: 'ahmet',
      name: 'Prof. Dr. Ahmet Bey',
      profession: 'Tarih ve Doğa Bilimleri Profesörü',
      avatar: '👨‍🏫',
      bias: 'high', // Very accurate for academic subjects
      style: 'Bilimsel ve akademik konuşur'
    },
    {
      id: 'can',
      name: 'Yazılımcı Mert',
      profession: 'Yapay Zeka Uzmanı & Reddit Meraklısı',
      avatar: '👨‍💻',
      bias: 'medium', // Good with tech, logic, popular culture
      style: 'Hızlı, dinamik ve popüler kültür odaklıdır'
    },
    {
      id: 'gul',
      name: 'Gül Teyze',
      profession: 'Mahallenin Kültür Küpü Altın Günü Lideri',
      avatar: '👵',
      bias: 'gut', // Follows instinct, funny, holds local trivia
      style: 'Sezgilerine çok güvenir, samimidir'
    }
  ];

  const generateSuggestion = (friendId: string, name: string, profession: string, avatar: string): PhoneFriendSuggestion => {
    const correct = question.correctOption;
    const wrongOptions = (Object.keys(question.options) as Array<'A' | 'B' | 'C' | 'D'>).filter(
      (opt) => opt !== correct
    );

    let guess: 'A' | 'B' | 'C' | 'D' | 'bilmiyorum' = correct;
    let confidence = 85;
    let message = '';

    const level = question.level;

    if (friendId === 'ahmet') {
      if (level <= 5) {
        confidence = 98;
        guess = correct;
        message = `Aziz dostum, sorduğun suali tetkik ettim. Bu gayet aşikar bir husus. Doğru cevap kesinlikle ama kesinlikle "${correct}: ${question.options[correct]}" olmalıdır. Kaynaklarım yanılmaz.`;
      } else if (level <= 10) {
        confidence = 80;
        guess = Math.random() < 0.85 ? correct : wrongOptions[0];
        if (guess === correct) {
          message = `Evladım, güzel bir soru. Müfredattan hatırladığım kadarıyla cevabın "${correct}: ${question.options[correct]}" olması gerekiyor. Kitaplarımda bu veri yazılıdır.`;
        } else {
          message = `Nadir rastlanan bir mevzu. Emin olmamakla beraber, hafızam beni yanıltmıyorsa sanki "${guess}: ${question.options[guess]}" seçeneğine daha yakın görünüyordu. Dikkatli olmanda yarar var.`;
        }
      } else {
        confidence = 55;
        guess = Math.random() < 0.6 ? correct : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        message = `Fevkalade müşkül bir mesele. Akademide bile tartışmalı bir husustur bu. Sezgilerim ve literatür taramam "${guess}: ${question.options[guess]}" seçeneğini işaret etse de, son kararı sana tevdi ediyorum.`;
      }
    } else if (friendId === 'can') {
      if (level <= 5) {
        confidence = 95;
        guess = correct;
        message = `Kanka bu aşırı kolay bir sorgu, veritabanında direkt çıktı! Hackathon sorusu gibi duruyor. Cevap net "${correct}: ${question.options[correct]}". Süren boşa gitmesin direkt işaretle!`;
      } else if (level <= 10) {
        confidence = 75;
        guess = Math.random() < 0.8 ? correct : wrongOptions[0];
        if (guess === correct) {
          message = `Dostum dün akşam buna benzer bir Wikipedia maddesi okumuştum sanırım. Algoritmam bana yüzde 75 oranında ihtimalle "${correct}: ${question.options[correct]}" seçeneğinin doğru olduğunu söylüyor.`;
        } else {
          message = `Dostum kafam biraz karıştı ama işlemcilerim beni "${guess}: ${question.options[guess]}" seçeneğine yönlendiriyor gibi. StackOverflow arşivlerime dayanıyorum ama risk senin!`;
        }
      } else {
        confidence = 40;
        guess = Math.random() < 0.45 ? correct : 'bilmiyorum';
        if (guess === 'bilmiyorum') {
          message = `Ayy inanılmaz zor bir soru hacker kardeşim. Hiçbir arama motorunda indeksli bir bilgi değil bu. Seni yanıltmak istemem, dürüst olayım bilmiyorum. Çekilmeyi düşünebilirsin.`;
        } else {
          message = `Uf! Bu gerçekten derin bir ağ sorgusu gerektirir. Sadece rastgele bir tahmin yapmam gerekirse, sanki "${correct}" hissi aldım ama tamamen sallıyorum diyebilirim.`;
        }
      }
    } else {
      // Gul Teyze (Gut feeling)
      if (level <= 5) {
        confidence = 90;
        guess = correct;
        message = `Ayy yavrum benim, canım evladım, ne güzel yarışıyorsun öyle gururlandım! Bu soruyu komşunun kızı geçen televizyonda söylemişti, cevabı çok iyi biliyorum, canım benim "${correct}: ${question.options[correct]}".`;
      } else if (level <= 10) {
        confidence = 65;
        guess = Math.random() < 0.7 ? correct : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        message = `Ah güzel gözlüm, Gül Teyze\'nin içine bir ses fısıldıyor... Sanki rüyamda görsem herhalde "${guess}: ${question.options[guess]}" derdim. Yüreğim bu şıkka kaydı ama sen yine kendi aklınla bir ölç biç yavrum.`;
      } else {
        confidence = 30;
        guess = Math.random() < 0.35 ? correct : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        message = `Ayy teyzen sana kurban olsun evladım, bu ne zor soru böyle! Bizim buralarda böyle şeyler pek konuşulmaz. Teyzenin altın günündeki hanımlara sorsam da bilmezler. İçimden bir his "${guess}" diyor ama sen yine benden çok biliyorsun kurban olayım dikkat et!`;
      }
    }

    return {
      friendName: name,
      profession,
      avatar,
      message,
      confidence,
      guess
    };
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-amber-500/40 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <Phone className="w-8 h-8 text-amber-400 animate-bounce" />
          <div>
            <h3 className="text-lg font-bold text-amber-400">Telefon Jokeri</h3>
            <p className="text-xs text-slate-400">Rehberinden aramak istediğin bir dostunu seç.</p>
          </div>
        </div>

        <div className="space-y-4">
          {friends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => onSelectFriend(generateSuggestion(friend.id, friend.name, friend.profession, friend.avatar))}
              className="w-full text-left bg-slate-950/60 p-4 rounded-xl border border-slate-800 hover:border-amber-500 hover:bg-slate-950 hover:shadow-lg transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-slate-900 p-2 rounded-xl border border-slate-800 group-hover:border-amber-500/40 transition-colors">
                  {friend.avatar}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition-colors">
                    {friend.name}
                  </h4>
                  <p className="text-xs text-slate-400">{friend.profession}</p>
                  <p className="text-[10px] text-slate-500 italic mt-1">{friend.style}</p>
                </div>
              </div>
              <span className="bg-amber-500/10 text-amber-400 text-xs py-1 px-2.5 rounded-lg border border-amber-500/20 max-w-[80px] text-center font-semibold">
                Ara
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
