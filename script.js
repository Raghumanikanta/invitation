(function() {
    // Target date: May 3, 2026 at 7:38 AM
    const TARGET_DATE = new Date(2026, 4, 3, 7, 38, 0);
    
    // Royalty-free wedding instrumental music
    const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c719c4d3c5.mp3?filename=romantic-wedding-strings-104242.mp3";
    
    let audioElement = null;
    let isPlaying = false;
    let musicButton = null;
    let countdownInterval = null;

    // Your image paths (from your original HTML)
    const MAIN_IMAGE = "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg";
    const CLOSING_IMAGE = "asset/WhatsApp%20Image%202026-04-20%20at%201.31.07%20PM%20(1).jpeg";
    const GROOM_IMAGE = "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg";
    const BRIDE_IMAGE = "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg";

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateCountdown() {
        const now = new Date();
        const diff = TARGET_DATE - now;
        
        if (diff <= 0) {
            const daysEl = document.getElementById('countdown-days');
            const hoursEl = document.getElementById('countdown-hours');
            const minsEl = document.getElementById('countdown-mins');
            const secsEl = document.getElementById('countdown-secs');
            
            if (daysEl) daysEl.innerText = '0';
            if (hoursEl) hoursEl.innerText = '00';
            if (minsEl) minsEl.innerText = '00';
            if (secsEl) secsEl.innerText = '00';
            
            if (countdownInterval) clearInterval(countdownInterval);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minsEl = document.getElementById('countdown-mins');
        const secsEl = document.getElementById('countdown-secs');
        
        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = pad(hours);
        if (minsEl) minsEl.innerText = pad(minutes);
        if (secsEl) secsEl.innerText = pad(seconds);
    }

    function initAudio() {
        if (!audioElement) {
            audioElement = new Audio(AUDIO_URL);
            audioElement.loop = true;
            audioElement.volume = 0.5;
        }
    }

    function toggleMusic() {
        initAudio();
        if (!audioElement) return;
        
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            if (musicButton) {
                musicButton.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M9 6.5v11L18 12 9 6.5z" fill="currentColor"/></svg>`;
                musicButton.setAttribute('aria-label', 'Play music');
            }
        } else {
            audioElement.play().catch(e => console.log("Audio play requires user interaction"));
            isPlaying = true;
            if (musicButton) {
                musicButton.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26"><rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/></svg>`;
                musicButton.setAttribute('aria-label', 'Pause music');
            }
        }
    }

    function startCountdown() {
        updateCountdown();
        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function renderInvitation() {
        const root = document.getElementById('root');
        if (!root) return;

        // Gallery images - using your asset images (repeated for marquee effect)
        const galleryImages = [
            MAIN_IMAGE, MAIN_IMAGE, MAIN_IMAGE, MAIN_IMAGE,
            MAIN_IMAGE, MAIN_IMAGE, MAIN_IMAGE, MAIN_IMAGE
        ];
        
        const galleryHTML = galleryImages.map(src => `
            <figure class="gallery-marquee__slide">
                <div class="gallery-marquee__frame">
                    <img src="${src}" alt="Wedding moment" decoding="async">
                </div>
            </figure>
        `).join('');

        const html = `
            <div class="invitation-container">
                <section class="landing-card">
                    <div class="landing-card__text">
                        <h1 class="landing-names">Raghu manikanta &amp; Harshitha</h1>
                        <p class="landing-lead">We are inviting you to our Marriage!</p>
                        <p class="landing-sub">Let's celebrate the best day of our life together!</p>
                    </div>
                    <div class="landing-card__photo">
                        <img src="${MAIN_IMAGE}" alt="Raghu manikanta & Harshitha" class="landing-card__photo-img">
                        <div class="landing-card__photo-gradient"></div>
                    </div>
                    <div class="landing-after-photo">
                        <h2 class="landing-after-photo__title">Our Moments!</h2>
                        <p class="landing-after-photo__subtitle">Come celebrate the beginning of our forever with us.</p>
                    </div>
                    <div class="gallery-marquee">
                        <div class="gallery-marquee__track">${galleryHTML}</div>
                    </div>
                </section>
                
                <section class="reception-letter">
                    <div class="reception-letter__content">
                        <h2 class="reception-letter__heading">Dear friends and family!</h2>
                        <p class="reception-letter__body">We are thrilled to announce a special event happening in this joyful season — our wedding reception! This day wouldn't be complete without our closest loved ones, so we warmly invite you to join us and celebrate this joyful occasion together.</p>
                        <p class="reception-letter__closing">We can't wait to share this memorable moment with you!</p>
                    </div>
                </section>
                
                <section class="event-timeline-section">
                    <header class="event-timeline-section__header">
                        <p class="event-timeline-section__eyebrow">Event timeline</p>
                        <p class="event-timeline-section__names">Raghu manikanta &amp; Harshitha</p>
                    </header>
                    <div class="event-timeline-section__list">
                        <article class="timeline-card">
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">SUNDAY 03.05.26</p>
                                <h2 class="timeline-card__title">RECEPTION (BRIDE)</h2>
                                <div class="timeline-card__row"><dt>11:30 AM</dt><dd>Reception</dd></div>
                                <p class="timeline-card__venue">Banjara Bhavan, Vinayaka Badavane, Davanagere</p>
                            </div>
                        </article>
                        <article class="timeline-card">
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">SUNDAY 03.05.26</p>
                                <h2 class="timeline-card__title">MUHURTAM</h2>
                                <div class="timeline-card__row"><dt>7:38 AM ONWARDS</dt><dd>Muhurtam</dd></div>
                                <p class="timeline-card__venue">Banjara Bhavan, Vinayaka Badavane, Davanagere</p>
                            </div>
                        </article>
                        <article class="timeline-card">
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">WEDNESDAY 06.05.26</p>
                                <h2 class="timeline-card__title">RECEPTION (GROOM)</h2>
                                <div class="timeline-card__row"><dt>11:00 AM</dt><dd>Reception</dd></div>
                                <p class="timeline-card__venue">Groom's Residence, Ram kishore colony, Sindhanur Tq, Raichur District</p>
                            </div>
                        </article>
                    </div>
                </section>
                
                <section class="dress-code-section">
                    <header><h2 class="dress-code-section__title">Moments</h2></header>
                    <div class="dress-code-section__rows">
                        <article class="dress-code-row">
                            <div class="dress-code-row__text">
                                <p class="dress-code-row__names">Raghu manikanta</p>
                            </div>
                            <figure class="dress-code-polaroid">
                                <img src="${GROOM_IMAGE}" alt="Raghu manikanta" loading="lazy">
                            </figure>
                        </article>
                        <article class="dress-code-row">
                            <div class="dress-code-row__text">
                                <p class="dress-code-row__names">Harshitha</p>
                            </div>
                            <figure class="dress-code-polaroid dress-code-polaroid--ccw">
                                <img src="${BRIDE_IMAGE}" alt="Harshitha" loading="lazy">
                            </figure>
                        </article>
                    </div>
                </section>
                
                <section class="countdown-section">
                    <p class="countdown-section__header">The event starts in:</p>
                    <div class="countdown-timer">
                        <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-days">0</span><span class="countdown-unit__label">Days</span></div>
                        <span class="countdown-sep">:</span>
                        <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-hours">00</span><span class="countdown-unit__label">Hours</span></div>
                        <span class="countdown-sep">:</span>
                        <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-mins">00</span><span class="countdown-unit__label">Minutes</span></div>
                        <span class="countdown-sep">:</span>
                        <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-secs">00</span><span class="countdown-unit__label">Seconds</span></div>
                    </div>
                </section>
                
                <section class="closing-message-card">
                    <div class="closing-message-card__image-wrap">
                        <img src="${CLOSING_IMAGE}" alt="Raghu manikanta & Harshitha" class="closing-message-card__image">
                        <div class="closing-message-card__image-gradient"></div>
                    </div>
                    <div class="closing-message-card__panel">
                        <p class="closing-message-card__script">Hope to see you there!</p>
                        <p class="closing-message-card__script">We Welcome You and your family!</p>
                        <p class="closing-message-card__names">Raghu manikanta &amp; Harshitha</p>
                        <span class="heart-svg">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="32" height="32">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41 1.01 4.5 2.09C11.09 5.01 12.76 4 14.5 4 16.58 4 18 5.42 18 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </span>
                    </div>
                </section>
            </div>
        `;
        
        root.innerHTML = html;
        
        // Add music button
        const btnContainer = document.createElement('div');
        btnContainer.innerHTML = `<button class="music-fab" id="musicToggleBtn" aria-label="Play music"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M9 6.5v11L18 12 9 6.5z" fill="currentColor"/></svg></button>`;
        document.body.appendChild(btnContainer.firstElementChild);
        
        musicButton = document.getElementById('musicToggleBtn');
        if (musicButton) {
            musicButton.addEventListener('click', toggleMusic);
        }
        
        startCountdown();
        
        // Preload audio on first user interaction (browsers require user gesture)
        const warmup = () => {
            initAudio();
            document.removeEventListener('click', warmup);
            document.removeEventListener('touchstart', warmup);
        };
        document.addEventListener('click', warmup);
        document.addEventListener('touchstart', warmup);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderInvitation);
    } else {
        renderInvitation();
    }
})();
