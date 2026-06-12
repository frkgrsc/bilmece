import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, Mail, Info, FileText, Lock } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const handleHomeRedirect = () => {
    if (onBack) {
      onBack();
    } else {
      // Safely reload the parent frame or page to root URL
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-10 px-4 md:px-8">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative z-10"
      >
        {/* Top bar with back option */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <button
            onClick={handleHomeRedirect}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-all cursor-pointer uppercase tracking-wider bg-slate-950/40 border border-slate-800/60 hover:border-amber-500/30 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfa
          </button>
          
          <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest font-mono">
            <Lock className="w-3 h-3 text-emerald-500" /> Play Store Uyumlu
          </div>
        </div>

        {/* Title */}
        <div className="text-center md:text-left mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg border border-amber-400/20 mx-auto md:mx-0 mb-4">
            <Shield className="w-6 h-6 text-slate-950" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight">
            Gizlilik Politikası
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Son Güncelleme: 12 Haziran 2026 • Milyoner Bilgi Yarışması
          </p>
        </div>

        {/* Policy Body */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* 1. Giriş */}
            <section className="bg-slate-950/40 border border-slate-800/40 p-4 rounded-xl">
              <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-amber-500" /> 1. Giriş ve Kapsam
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bu gizlilik politikası, <strong>Milyoner Bilgi Yarışması</strong> ("Uygulama") mobil ve web platformlarındaki kullanıcı verilerinin nasıl toplandığını, saklandığını, işlendiğini ve korunduğunu açıklamaktadır. Bu politika, Google Play Store Geliştirici Politikaları, kişisel verilerin korunması kanunları (KVKK) ve Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR) gerekliliklerine tam uyum sağlamak üzere hazırlanmıştır.
              </p>
            </section>

            {/* 2. Toplanan Veriler */}
            <section className="space-y-3">
              <h2 className="text-sm font-extrabold text-slate-150 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" /> 2. Toplanan Veri Türleri ve Amacı
              </h2>
              <p className="text-xs text-slate-400">
                Uygulamamız oyun deneyimini iyileştirmek, multiplayer (düello) eşleşmeleri sağlamak ve küresel liderlik tablosunu (skorbord) yönetmek amacıyla asgari düzeyde teknik veri işler:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1.5 list-inside">
                <li>
                  <strong className="text-slate-200">Kullanıcı Takma Adı (Nickname):</strong> Oyuna başlarken isteğe bağlı girdiğiniz takma ad, skorbordda ve düello odasında diğer oyunculara gösterilmek üzere geçici veya kalıcı olarak işlenir.
                </li>
                <li>
                  <strong className="text-slate-200">Puan ve Başarı Kayıtları:</strong> Kazandığınız ödül miktarı, ulaştığınız seviye, doğru/yanlış oranı ve açtığınız başarı rozetleri (achievements) kaydedilir.
                </li>
                <li>
                  <strong className="text-slate-200">Anonim Kullanıcı Kimliği (UID):</strong> Firebase Authentication altyapısı kullanılarak cihazınız için tamamen rastgele, kimliğinizi doğrudan belli etmeyen benzersiz bir anonim kimlik oluşturulur. Bu kimlik düello eşleşmelerinizi korumak için zorunludur.
                </li>
                <li>
                  <strong className="text-slate-200">Yerel Cihaz Tercihleri:</strong> Ses açma/kapama durumları, yerel yüksek skorlarınız ve başarılarınız cihazınızda saklanır (LocalStorage).
                </li>
              </ul>
            </section>

            {/* 3. Üçüncü Taraf Servisler */}
            <section className="bg-slate-950/40 border border-slate-800/40 p-4 rounded-xl">
              <h2 className="text-sm font-extrabold text-slate-150 uppercase tracking-wide flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-500" /> 3. Üçüncü Taraf Entegrasyonlar ve Veri Aktarımı
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uygulama, güvenli altyapılar ve kesintisiz düello odaları sunabilmek adına güvenilir üçüncü taraf hizmetler kullanır:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs text-slate-400">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <strong className="text-slate-200 block mb-1">Google Firebase Services:</strong>
                  Firebase Auth, anonim olarak oyun sunucularına bağlanmanızı temin eder. Firestore ise skorbord rekorlarınızı ve düello verilerini gerçek zamanlı olarak depolar.
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                  <strong className="text-slate-200 block mb-1">Çerez ve LocalStorage:</strong>
                  Tarayıcınızın veya uygulama önbelleğinizin yerel belleği kullanılır. Bu veriler reklam şirketleriyle paylaşılmaz ve üçüncü taraf izleme kodları içermez.
                </div>
              </div>
            </section>

            {/* 4. Veri Saklama ve Güvenlik */}
            <section className="space-y-2">
              <h2 className="text-sm font-extrabold text-slate-150 uppercase tracking-wide">
                4. Veri Saklama Süresi ve Güvenlik Önlemleri
              </h2>
              <p className="text-xs text-slate-400">
                Verileriniz yalnızca oyunu düzgün bir şekilde oynayabilmeniz ve sıralamaları görebilmeniz için gerekli olan süre boyunca Firebase bulut sunucularında veya yerel cihaz hafızanızda saklanır. Tüm veri transferleri SSL/TLS şifreli bağlantılar üzerinden gerçekleştirilir ve yetkisiz erişimlere karşı Firestore güvenlik kuralları ile korunur.
              </p>
            </section>

            {/* 5. Çocukların Gizliliği */}
            <section className="space-y-2">
              <h2 className="text-sm font-extrabold text-slate-150 uppercase tracking-wide">
                5. Çocukların Gizliliği (Children's Privacy)
              </h2>
              <p className="text-xs text-slate-400">
                Uygulamamız her yaş grubu için uygundur ve kesinlikle çocuklardan bilerek kişisel tanımlayıcı bilgi toplamaz. Herhangi bir aşamada e-posta, telefon numarası veya tam ad gibi doğrudan kişisel hassas bilgiler veya konum verileri toplanmamaktadır.
              </p>
            </section>

            {/* 6. Kullanıcı Hakları ve Talepler */}
            <section className="bg-slate-950/40 border border-slate-800/40 p-4 rounded-xl">
              <h2 className="text-sm font-extrabold text-slate-150 uppercase tracking-wide flex items-center gap-2 mb-2">
                Haklarınız & Silme Talepleri
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kişisel verilerinizin (örneğin skorborddaki takma adınızın veya kaydınızın) silinmesini, değiştirilmesini veya cihazınız ile eşleştirilmesinin kaldırılmasını her zaman talep edebilirsiniz. Bu talepleriniz için aşağıdaki geliştirici iletişim e-posta adresine takma adınız ve anonim kullanıcı tanımlayıcınız ile başvurmanız yeterlidir. Talepler en geç 48 saat içerisinde değerlendirilerek yerine getirilir.
              </p>
            </section>

            {/* 7. İletişim */}
            <section className="border-t border-slate-800 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-slate-200">Geliştirici & Veri Sorumlusu İletişim:</h3>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                  <Mail className="w-3.5 h-3.5 text-amber-500" /> goresciomerfaruk279@gmail.com
                </span>
              </div>
              <p className="text-[10px] text-slate-500 max-w-[250px] leading-tight text-right md:text-right text-left">
                Bu gizlilik bildirimi Play Store uygulama yükleme formları ve web erişimleri için tam geçerliliğe sahiptir.
              </p>
            </section>
          </div>

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleHomeRedirect}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer uppercase tracking-wider"
          >
            Anladım, Oyuna Dön
          </button>
        </div>
      </motion.div>
    </div>
  );
}
