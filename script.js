// 1. Quản lý danh mục
let categories = ["Video", "Nhạc", "Clip", "Podcast"];

function renderCategories() {
    const menu = document.getElementById('category-menu');
    const adminPanel = document.getElementById('category-admin');
    
    // Reset
    menu.innerHTML = '<li><a href="#" class="text-indigo-600 font-bold">Trang chủ</a></li>';
    adminPanel.innerHTML = '';

    categories.forEach((cat, index) => {
        // Render menu chính
        menu.innerHTML += `<li><a href="#" class="hover:text-indigo-600 transition">${cat}</a></li>`;
        
        // Render phần quản trị danh mục
        adminPanel.innerHTML += `
            <div class="flex items-center space-x-2">
                <input type="text" value="${cat}" onchange="updateCategory(${index}, this.value)" 
                class="flex-1 text-sm p-1 border rounded focus:border-indigo-400 outline-none">
            </div>
        `;
    });
}

function updateCategory(index, newVal) {
    categories[index] = newVal;
    renderCategories(); // Cập nhật lại toàn bộ giao diện khi đổi tên
}

// 2. Tạo mã QR tự động
function generateQR() {
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // Xóa QR cũ
    new QRCode(qrContainer, {
        text: window.location.href, // Lấy URL hiện tại
        width: 150,
        height: 150,
        colorDark : "#4338ca", // Indigo 700
        colorLight : "#ffffff",
    });
}

function downloadQR() {
    const img = document.querySelector("#qrcode img");
    if (img) {
        const link = document.createElement("a");
        link.href = img.src;
        link.download = "website-qr-code.png";
        link.click();
    }
}

// 3. Xử lý Form đăng tải (Giả lập)
document.getElementById('media-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const type = document.getElementById('media-type').value;
    const desc = document.getElementById('desc').value;

    // Tạo thẻ card giả lập nội dung mới
    const mediaList = document.getElementById('media-list');
    const newCard = document.createElement('div');
    newCard.className = "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 fade-in";
    newCard.innerHTML = `
        <div class="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
            [Media Preview: ${type}]
        </div>
        <div class="p-4">
            <span class="text-xs font-bold text-indigo-500 uppercase">${type}</span>
            <h4 class="font-bold text-lg mt-1">${title}</h4>
            <p class="text-gray-500 text-sm mt-2 line-clamp-2">${desc}</p>
        </div>
    `;
    
    mediaList.prepend(newCard); // Đưa lên đầu danh sách
    this.reset();
    alert("Tải lên thành công! (Lưu ý: Đây là bản demo giao diện)");
});

// Tiện ích: Cuộn xuống form
function scrollToUpload() {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
}

// Khởi tạo khi load trang
window.onload = () => {
    renderCategories();
    generateQR();
};
