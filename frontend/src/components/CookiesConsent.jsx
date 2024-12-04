import React, { useState, useEffect } from 'react';
function CookiesConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookiesConsent');
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesConsent', 'true');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed-bottom bg-light text-xl-center py-3 mx-3 mb-4 rounded-3 shadow-sm col-10 col-xl-8 mx-auto row">
            <p className="m-2 col">
                Używamy plików cookie, aby poprawić Twoje doświadczenia. Korzystając z naszej strony, zgadzasz się na używanie przez nas plików cookie.
            </p>
            <button onClick={handleAccept} className="btn btn-primary mx-2 col-2 col-xxl-1">Akceptuj</button>
        </div>
    );
}

export default CookiesConsent;
