/* Gallery photos: edit this list to change, reorder or re-caption the gallery.
   src    – file in images/web/ (resized copy of an original in images/)
   w, h   – real pixel size of that file (reserves space, prevents layout shift)
   span   – "wide" or "tall": how many grid cells it fills on desktop
   alt/ar – what the photo actually shows, English and Arabic */
window.P3_GALLERY = [
  { src: "hero-interior.jpg",       w: 1280, h: 960,  span: "wide", alt: "The café interior with gold ring lights and black chairs", ar: "داخل المقهى: إضاءة بحلقات ذهبية وكراسٍ سوداء" },
  { src: "dessert-brand.jpg",       w: 1254, h: 1254, span: "tall", alt: "A dessert and a P3 cup on a wooden table", ar: "حلوى وكوب P3 على طاولة خشبية" },
  { src: "arabic-coffee-set.jpg",   w: 1200, h: 1600, span: "tall", alt: "A golden dallah, small white cups and dates on a black tray", ar: "دلّة ذهبية وفناجين بيضاء صغيرة وتمر على صينية سوداء" },
  { src: "latte-art.jpg",           w: 1800, h: 1347, span: "wide", alt: "Latte art in a takeaway cup", ar: "فن الرغوة على اللاتيه في كوب ورقي" },
  { src: "cups-packaging.jpg",      w: 1280, h: 853,  span: "wide", alt: "Black and gold P3 cups", ar: "أكواب P3 سوداء وذهبية" },
  { src: "arabic-coffee-pour.jpg",  w: 1350, h: 1800, span: "tall", alt: "Arabic coffee and dates on a marble table", ar: "قهوة عربية وتمر على طاولة رخامية" },
  { src: "tiramisu-latte.jpg",      w: 1080, h: 1440, span: "tall", alt: "A dessert cup and a heart-shaped latte", ar: "كوب حلوى ولاتيه على شكل قلب" },
  { src: "spicy-tuna-sandwich.jpg", w: 1536, h: 1024, span: "wide", alt: "A tuna sandwich with rocket, radish and chilli", ar: "ساندويتش تونة مع الجرجير والفجل والفلفل" }
];

(function () {
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;
  window.P3_AR = window.P3_AR || {};
  window.P3_GALLERY.forEach(function (p, i) {
    var key = "g." + (i + 1), url = "images/web/" + p.src;
    window.P3_AR[key] = p.ar;
    var li = document.createElement("li");
    li.className = "g g-" + p.span + " reveal";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.full = url;
    var img = document.createElement("img");
    img.src = url; img.width = p.w; img.height = p.h;
    img.loading = "lazy"; img.alt = p.alt;
    img.dataset.i18nAlt = key;
    btn.appendChild(img); li.appendChild(btn); grid.appendChild(li);
  });
})();
