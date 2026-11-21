// LuxeHaven Hotel Booking - Modern JavaScript Application Logic
const rooms = [
  {
    id: 1,
    title: "Executive Oceanfront Suite",
    category: "deluxe",
    price: 8500,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    features: ["King Size Bed", "Ocean View Balcony", "Free Wi-Fi", "Bathtub", "Complimentary Breakfast"],
    description: "Panoramic ocean vistas with luxurious interior finishes, Italian marble bathroom, and 24/7 private concierge."
  },
  {
    id: 2,
    title: "Royal Azure Private Pool Villa",
    category: "villa",
    price: 18500,
    rating: 5.0,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    features: ["Private Infinity Pool", "Sun Deck", "Mini Bar", "Chef on Call", "Jacuzzi"],
    description: "Secluded private sanctuary with individual temperature-controlled pool, garden dining, and bespoke butler service."
  },
  {
    id: 3,
    title: "Grand Presidential Penthouse",
    category: "presidential",
    price: 29000,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: ["360 Skyline View", "Personal Butler", "Private Elevator", "Meeting Lounge", "Spa Access"],
    description: "The pinnacle of sophistication occupying the top two floors with private terrace, personal sommelier, and luxury chauffeur."
  },
  {
    id: 4,
    title: "Signature Garden Deluxe Room",
    category: "deluxe",
    price: 6200,
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    features: ["Garden Patio", "Queen Bed", "Workstation", "Rain Shower", "High-Speed Wi-Fi"],
    description: "Peaceful botanical views with ergonomic workspace, plush bedding, and artisanal local refreshment bar."
  },
  {
    id: 5,
    title: "Heritage Sunset Pool Pavilion",
    category: "villa",
    price: 16000,
    rating: 4.9,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    features: ["Plunge Pool", "Outdoor Shower", "Hammock", "Yoga Mat", "Espresso Machine"],
    description: "Traditional architecture blended with state-of-the-art climate control, outdoor relaxation pavilion, and sunset panorama."
  },
  {
    id: 6,
    title: "Skyline Royal Ambassador Suite",
    category: "presidential",
    price: 24500,
    rating: 4.9,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
    features: ["Dual Master Bedrooms", "Private Dining", "Chauffeur Service", "Dedicated Concierge"],
    description: "Designed for world leaders and discerning travelers requiring unmatched privacy, security, and refined opulence."
  }
];

let currentFilter = 'all';
let selectedRoom = null;

function renderRooms(items) {
  const container = document.getElementById('roomsGrid');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center py-16">
        <p class="text-slate-500 font-medium">No suites match your search criteria. Please adjust your filters.</p>
      </div>
    `;
    return;
  }

  items.forEach(room => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group";

    card.innerHTML = `
      <div class="relative overflow-hidden h-60">
        <img src="${room.image}" alt="${room.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          ⭐ ${room.rating} <span class="text-slate-400 font-normal">(${room.reviews})</span>
        </div>
        <div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
          ${room.category.toUpperCase()}
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition mb-2">${room.title}</h3>
          <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">${room.description}</p>
          
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${room.features.slice(0, 3).map(f => `
              <span class="text-[11px] bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md">
                ${f}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-medium">Per Night</span>
            <div class="text-xl font-bold text-slate-900">₹${room.price.toLocaleString('en-IN')}</div>
          </div>
          <button onclick="openBookingModal(${room.id})" class="px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-sm">
            Book Now
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

function setFilter(category) {
  currentFilter = category;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
    tab.classList.add('text-slate-600');
  });

  const activeTab = document.getElementById(`tab-${category}`);
  if (activeTab) {
    activeTab.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
    activeTab.classList.remove('text-slate-600');
  }

  if (category === 'all') {
    renderRooms(rooms);
  } else {
    const filtered = rooms.filter(r => r.category === category);
    renderRooms(filtered);
  }
}

function filterRooms() {
  const checkIn = document.getElementById('checkInDate').value;
  const checkOut = document.getElementById('checkOutDate').value;

  if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
    alert("Check-out date must be after check-in date!");
    return;
  }

  scrollToRooms();
}

function scrollToRooms() {
  document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
}

function openBookingModal(roomId) {
  selectedRoom = rooms.find(r => r.id === roomId);
  if (!selectedRoom) return;

  document.getElementById('modalRoomTitle').innerText = selectedRoom.title;
  document.getElementById('modalRoomPrice').innerText = `₹${selectedRoom.price.toLocaleString('en-IN')} / night`;
  calculateTotal();
  document.getElementById('bookingModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('bookingModal').classList.add('hidden');
}

function calculateTotal() {
  if (!selectedRoom) return;
  const nights = parseInt(document.getElementById('stayNights').value) || 1;
  const total = selectedRoom.price * nights;
  document.getElementById('totalPrice').innerText = `₹${total.toLocaleString('en-IN')}`;
}

function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value;
  const nights = document.getElementById('stayNights').value;

  alert(`Congratulations ${name}! Your reservation for ${selectedRoom.title} for ${nights} night(s) has been successfully recorded. Confirmation details sent to your email!`);
  closeModal();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderRooms(rooms);
  lucide.createIcons();

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);

  document.getElementById('checkInDate').value = today.toISOString().split('T')[0];
  document.getElementById('checkOutDate').value = tomorrow.toISOString().split('T')[0];
});
