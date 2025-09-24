// --- Modal Logic ---
const modal = document.getElementById('bookingModal');
const modalProId = document.getElementById('modalProId');
const modalProName = document.getElementById('modalProName');
const modalService = document.getElementById('modalService');
const successMessage = document.getElementById('successMessage');
const bookingForm = document.getElementById('bookingForm');


function openBookingModal(proId, proName, service) {
    modalProId.value = proId;
    modalProName.innerText = proName;
    modalService.innerText = service;
    
    // Reset form state
    bookingForm.reset();
    successMessage.style.display = 'none'; 
    bookingForm.style.display = 'block'; 
    
    modal.style.display = 'block';
}

function closeBookingModal() {
    modal.style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        closeBookingModal();
    }
}

// --- Form Submission Logic ---
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const bookingData = {
        professional_id: document.getElementById('modalProId').value,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
    };

    fetch('/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Hide the form and show a success message
            bookingForm.style.display = 'none';
            successMessage.innerText = `Success! Your booking with ${modalProName.innerText} is confirmed. We will contact you shortly.`;
            successMessage.style.display = 'block';
        } else {
            alert('Booking failed. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});