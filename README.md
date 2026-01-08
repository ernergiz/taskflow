# TaskFlow Lite ✅

TaskFlow Lite, kullanıcıların günlük görevlerini yönetebileceği,
basit ve kullanıcı dostu bir **Todo uygulamasıdır**.

---

## 🚀 Özellikler

- Görev ekleme / silme
- Görevleri **Aktif / Tamamlanan / Tümü** olarak filtreleme
- Boş liste durumları için **Empty State** gösterimi
- Silinen görevler için **Deleted** sayfası
  - Kalıcı silme
  - Geri yükleme
- Responsive tasarım (mobil uyumlu)

---

## 🧱 Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript (Vanilla JS)
- Supabase (Auth & Database)

---

## 🔐 Kimlik Doğrulama (Auth)

Bu projede kullanıcı doğrulama işlemleri **Supabase Auth** kullanılarak gerçekleştirilmiştir.

### Signup (Kayıt Olma) Hakkında
Supabase Auth, **email verification (email doğrulama)** sürecini zorunlu tuttuğu için,
doğrulama tamamlanmadan yeni kullanıcı oluşturulmaya çalışıldığında
uygulama tarafında hata oluşmaktaydı.

Projede otomatik email verification süreci yapılandırılmadığı için,
uygulamanın kararlılığını korumak amacıyla signup (kayıt olma) özelliği
bilinçli olarak devre dışı bırakılmıştır.

Mevcut mimari, email doğrulama süreci eklendiğinde
signup özelliğinin tekrar aktif edilmesine uygundur.

---

## 📱 Responsive Tasarım

Uygulama, masaüstü ve mobil ekranlar için uyumlu olacak şekilde tasarlanmıştır.
Özellikle görev listeleri ve silinen görevler sayfası,
mobil görünümde okunabilirliği koruyacak şekilde düzenlenmiştir.

---

## 📂 Sayfalar

- `login.html` → Kullanıcı giriş ekranı
- `todo.html` → Görev yönetimi ekranı
- `deleted.html` → Silinen görevler ekranı

---

## ⚙️ Kurulum ve Çalıştırma

Bu proje saf HTML, CSS ve JavaScript kullanılarak geliştirilmiştir.
Herhangi bir build veya package manager gerektirmez.

### Çalıştırma
1. Proje dosyalarını indirin veya klonlayın
2. `login.html` dosyasını tarayıcıda açın
3. Supabase bağlantısı aktif olduğu sürece uygulama çalışır

---

## 🔑 Ortam Değişkenleri (Environment Variables)

Bu projede Supabase bağlantı bilgileri JavaScript dosyaları içerisinde
tanımlanmıştır.

Gerçek projelerde güvenlik sebebiyle bu bilgilerin `.env` dosyası üzerinden
yönetilmesi önerilir.

> Bu proje staj süreci kapsamında hazırlandığı için,
> kurulum kolaylığı amacıyla env ayrıştırması yapılmamıştır.

---

## 🔒 Repository Hakkında

Bu repository, inceleme sürecini kolaylaştırmak amacıyla **public**
olarak paylaşılmıştır.

Talep edilmesi halinde private repository olarak da sunulabilir.

## 👤 Geliştirici

**Nergiz Er**  
Stajyer Adayı – Frontend Geliştirici
