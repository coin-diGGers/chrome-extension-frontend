function addButtonToCenter() {
    const button = document.createElement('button');
    button.textContent = 'Register Wallet';
    button.style.position = 'absolute';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = '#f0f0f0';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '5px';

    function updateButtonPosition() {
        const docWidth = document.documentElement.scrollWidth;
        const docHeight = document.documentElement.scrollHeight;
        button.style.left = `${docWidth - button.offsetWidth}px`;
        button.style.top = `${docHeight - button.offsetHeight}px`;
    }

    function createModal() {
        const coinAmount = 100; // amount
        const coinName = 'btc'; // coin name
        const agencyName = '김용식'; // agency name

        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = 0;
        modalOverlay.style.left = 0;
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '10000';

        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        modal.style.maxWidth = '400px';  // Optionally, constrain modal width

        // Add message above input field
        const message = document.createElement('p');
        message.textContent = `You have found ${coinAmount} ${coinName} on ${agencyName}. Please enter your ${coinName} Address`;
        message.style.marginBottom = '15px';
        message.style.fontSize = '16px';

        const walletInput = document.createElement('input');
        walletInput.type = 'text';
        walletInput.placeholder = `Enter your ${coinName} address`;
        walletInput.style.width = '100%';
        walletInput.style.marginBottom = '10px';
        walletInput.style.padding = '8px';
        walletInput.style.boxSizing = 'border-box';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.style.padding = '10px 20px';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.padding = '10px 20px';
        closeButton.style.marginLeft = '10px';

        modal.appendChild(message); // Add message to modal
        modal.appendChild(walletInput);
        modal.appendChild(submitButton);
        modal.appendChild(closeButton);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        closeButton.addEventListener('click', function () {
            document.body.removeChild(modalOverlay);
        });

        submitButton.addEventListener('click', function () {
            const walletAddress = walletInput.value;

            if (walletAddress) {
                // 백엔드 API에 주소를 전송
                fetch('http://localhost:3000/extension', { // URL을 실제 API 엔드포인트로 교체
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        agency_name: agencyName,
                        coin_name: coinName,
                        coin_ammount: coinAmount,
                        coin_address: walletAddress
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.msg || 'Submitted successfully');
                        document.body.removeChild(modalOverlay);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Submission failed. Please try again.');
                    });
            } else {
                alert('Please enter a valid address.');
            }
        });
    }

    document.body.appendChild(button);
    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    window.addEventListener('scroll', updateButtonPosition);

    button.addEventListener('click', function () {
        createModal();
    });
}

addButtonToCenter();
