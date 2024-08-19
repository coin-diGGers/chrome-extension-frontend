function treasure() {
    const agencyUniqueNumber = 9; // 보물찾기마다 바꿔야 되는 부분 ----------------------------------------------------------------------------

    function checkAndDisplayButton() {
        const currentUrl = window.location.href;
        const targetUrl = 'https://asdf-vm.com/'; // 보물찾기마다 바꿔야 되는 부분 ----------------------------------------------------------------------------
        const existingButton = document.getElementById('treasure-button');

        if (currentUrl === targetUrl && !existingButton) {
            // 서버에서 현재 상태를 확인하고 버튼을 생성할지 결정
            fetch(`http://localhost:3000/extension/status/${agencyUniqueNumber}`)
                .then(response => response.json())
                .then(data => {
                    if (data.isFound) {
                        console.log(`Treasure ${agencyUniqueNumber} already found. Button will not be displayed.`);
                        return; // Treasure가 이미 발견되었으면 버튼을 생성하지 않음
                    }
                    createButton();
                })
                .catch(error => {
                    console.error('Error checking treasure status:', error);
                });
        } else if (currentUrl !== targetUrl && existingButton) {
            document.body.removeChild(existingButton);
        }
    }

    function createButton() {
        const button = document.createElement('button');
        button.id = 'treasure-button';
        button.textContent = 'Register Wallet';
        button.style.position = 'absolute';
        button.style.zIndex = '9999';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#f0f0f0';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '5px';

        document.body.appendChild(button);

        updateButtonPosition();

        window.addEventListener('resize', updateButtonPosition);
        window.addEventListener('scroll', updateButtonPosition);

        button.addEventListener('click', function () {
            createModal();
        });

        function updateButtonPosition() {
            const docWidth = document.documentElement.scrollWidth;
            const docHeight = document.documentElement.scrollHeight;
            button.style.left = `${docWidth - button.offsetWidth}px`;
            button.style.top = `${docHeight - button.offsetHeight}px`;
        }

        function createModal() {
            const coinAmount = 0.01; // 보물찾기마다 바꿔야 되는 부분 ----------------------------------------------------------------------------
            const coinName = 'ETH'; // 보물찾기마다 바꿔야 되는 부분 ----------------------------------------------------------------------------
            const agencyName = '@sarah_jxxg'; // 보물찾기마다 바꿔야 되는 부분 ----------------------------------------------------------------------------

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
            modal.style.maxWidth = '400px';

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

            modal.appendChild(message);
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
                    fetch('http://localhost:3000/extension', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            agency_name: agencyName,
                            coin_name: coinName,
                            coin_ammount: coinAmount,
                            coin_address: walletAddress,
                            agency_unique_number: agencyUniqueNumber
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert(data.msg || 'Submitted successfully');
                            document.body.removeChild(modalOverlay);
                            document.body.removeChild(button); // 제출 성공 시 버튼 제거
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
    }

    // 현재 URL 감지 및 변화 감지
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            checkAndDisplayButton();
        }
    }).observe(document, { subtree: true, childList: true });

    // 초기 확인
    checkAndDisplayButton();
}

treasure();
