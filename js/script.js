(function() {
    // ========== WEDDING DATE: May 3, 2026 at 7:38 AM ==========
    const TARGET_DATE = new Date(2026, 4, 3, 7, 38, 0);
    
    // ========== BACKGROUND MUSIC ==========
    const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c719c4d3c5.mp3?filename=romantic-wedding-strings-104242.mp3";
    
    // ========== YOUR IMAGE PATHS ==========
    const IMAGES = {
        main: "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg",
        closing: "asset/WhatsApp%20Image%202026-04-20%20at%201.31.07%20PM%20(1).jpeg",
        groom: "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg",
        bride: "asset/WhatsApp%20Image%202026-04-20%20at%201.31.04%20PM.jpeg"
    };
    
    let audioElement = null;
    let isPlaying = false;
    let countdownInterval = null;
    let isOpen = false;

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    // ========== COUNTDOWN FUNCTION ==========
    function updateCountdown() {
        const now = new Date();
        const diff = TARGET_DATE - now;
        
        const daysSpan = document.getElementById('countdown-days');
        const hoursSpan = document.getElementById('countdown-hours');
        const minsSpan = document.getElementById('countdown-mins');
        const secsSpan = document.getElementById('countdown-secs');
        
        if (!daysSpan) return;
        
        if (diff <= 0) {
            daysSpan.innerText = '0';
            hoursSpan.innerText = '00';
            minsSpan.innerText = '00';
            secsSpan.innerText = '00';
            if (countdownInterval) clearInterval(countdownInterval);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        daysSpan.innerText = days;
        hoursSpan.innerText = pad(hours);
        minsSpan.innerText = pad(minutes);
        secsSpan.innerText = pad(seconds);
    }

    function startCountdown() {
        updateCountdown();
        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ========== AUDIO FUNCTIONS ==========
    function initAudio() {
        if (!audioElement) {
            audioElement = new Audio(AUDIO_URL);
            audioElement.loop = true;
            audioElement.volume = 0.5;
        }
    }

    function toggleMusic() {
        if (!isOpen) return;
        initAudio();
        if (!audioElement) return;
        
        const musicBtn = document.getElementById('musicToggleBtn');
        
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            if (musicBtn) {
                musicBtn.innerHTML = `<svg class="countdown-play-fab__icon countdown-play-fab__icon--play" viewBox="0 0 24 24"><path d="M9 6.5v11L18 12 9 6.5z" fill="currentColor"/></svg>`;
                musicBtn.setAttribute('aria-label', 'Play music');
            }
        } else {
            audioElement.play().catch(e => console.log("Audio needs user interaction first"));
            isPlaying = true;
            if (musicBtn) {
                musicBtn.innerHTML = `<svg class="countdown-play-fab__icon" viewBox="0 0 24 24"><rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/></svg>`;
                musicBtn.setAttribute('aria-label', 'Pause music');
            }
        }
    }

    function enableAudioOnInteraction() {
        initAudio();
        if (audioElement && !isPlaying && isOpen) {
            audioElement.play().catch(e => console.log("Auto-play prevented"));
            isPlaying = true;
            const musicBtn = document.getElementById('musicToggleBtn');
            if (musicBtn) {
                musicBtn.innerHTML = `<svg class="countdown-play-fab__icon" viewBox="0 0 24 24"><rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="currentColor"/></svg>`;
            }
        }
        document.removeEventListener('click', enableAudioOnInteraction);
        document.removeEventListener('touchstart', enableAudioOnInteraction);
    }

    // ========== GALLERY IMAGES (using your asset) ==========
    function getGalleryHTML() {
        const gallerySrc = IMAGES.main;
        const images = [gallerySrc, gallerySrc, gallerySrc, gallerySrc, gallerySrc, gallerySrc, gallerySrc, gallerySrc];
        
        return images.map(src => `
            <figure class="gallery-marquee__slide">
                <div class="gallery-marquee__frame">
                    <img src="${src}" alt="Wedding moment" decoding="async" onerror="this.src='https://placehold.co/400x500/f7ede3/b35f2b?text=Love'">
                    <span class="gallery-marquee__overlay" aria-hidden="true"></span>
                </div>
            </figure>
        `).join('');
    }

    // ========== RENDER LOCK SCREEN ==========
    function renderLockScreen() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="invitation-container is-locked">
                <div class="hero-wrapper">
                    <div class="hero-content">
                        <div class="invitation-circle-container">
                            <div class="invitation-circle-stack">
                                <div class="circle-inner-plate" aria-hidden="true"></div>
                                <img class="circle-frame-img" src="${IMAGES.main}" alt="Wedding frame" decoding="async" onerror="this.src='https://placehold.co/500x500/e3d4c4/b35f2b?text=Love'">
                                <div class="invitation-circle">
                                    <h2>You're Invited!</h2>
                                    <p>Join us in making this day unforgettable!</p>
                                    <button class="discover-btn" id="discoverBtn">Discover the details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('discoverBtn')?.addEventListener('click', () => {
            isOpen = true;
            renderOpenInvitation();
            document.addEventListener('click', enableAudioOnInteraction, { once: true });
            document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
        });
    }

    // ========== RENDER MAIN INVITATION ==========
    function renderOpenInvitation() {
        const root = document.getElementById('root');
        const galleryHTML = getGalleryHTML();
        
        const html = `
            <div class="invitation-container is-open">
                <section class="landing-card">
                    <div class="landing-card__text">
                        <h1 class="landing-names">Raghu manikanta &amp; Harshitha</h1>
                        <p class="landing-lead">We are inviting you to our Marriage!</p>
                        <p class="landing-sub">Let's celebrate the best day of our life together!</p>
                    </div>
                    <div class="landing-card__photo">
                        <img src="${IMAGES.main}" alt="Raghu manikanta & Harshitha" class="landing-card__photo-img" onerror="this.src='https://placehold.co/600x500/e3d4c4/b35f2b?text=Couple'">
                        <div class="landing-card__photo-gradient" aria-hidden="true"></div>
                    </div>
                    <div class="landing-after-photo">
                        <h2 class="landing-after-photo__title">Our Moments!</h2>
                        <p class="landing-after-photo__subtitle">Come celebrate the beginning of our forever with us.</p>
                    </div>
                    <div class="landing-marquee-wrap">
                        <div class="gallery-marquee gallery-marquee--embed" role="region" aria-label="Photo gallery">
                            <div class="gallery-marquee__inner">
                                <div class="gallery-marquee__track">
                                    ${galleryHTML}
                                </div>
                            </div>
                        </div>
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
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">SUNDAY 03.05.26</p>
                                <h2 class="timeline-card__title">RECEPTION (BRIDE)</h2>
                                <dl class="timeline-card__schedule"><div class="timeline-card__row"><dt>11:30 AM</dt><dd>Reception</dd></div></dl>
                                <p class="timeline-card__venue">Banjara Bhavan, Vinayaka Badavane, Davanagere</p>
                            </div>
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                        </article>
                        <article class="timeline-card">
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">SUNDAY 03.05.26</p>
                                <h2 class="timeline-card__title">MUHURTAM</h2>
                                <dl class="timeline-card__schedule"><div class="timeline-card__row"><dt>7:38 AM ONWARDS</dt><dd>Muhurtam</dd></div></dl>
                                <p class="timeline-card__venue">Banjara Bhavan, Vinayaka Badavane, Davanagere</p>
                            </div>
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                        </article>
                        <article class="timeline-card">
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                            <div class="timeline-card__body">
                                <p class="timeline-card__date">WEDNESDAY 06.05.26</p>
                                <h2 class="timeline-card__title">RECEPTION (GROOM)</h2>
                                <dl class="timeline-card__schedule"><div class="timeline-card__row"><dt>11:00 AM</dt><dd>Reception</dd></div></dl>
                                <p class="timeline-card__venue">Groom's Residence, Ram kishore colony, Sindhanur Tq, Raichur District</p>
                            </div>
                            <div class="timeline-card__ornament" aria-hidden="true"><span class="timeline-card__line"></span><span class="timeline-card__dot"></span><span class="timeline-card__line"></span></div>
                        </article>
                    </div>
                </section>
                
                <section class="dress-code-section">
                    <header class="dress-code-section__header"><h2 class="dress-code-section__title">Moments</h2></header>
                    <div class="dress-code-section__rows">
                        <article class="dress-code-row dress-code-row--text-first">
                            <div class="dress-code-row__text">
                                <p class="dress-code-row__names"><span class="dress-code-row__name-line">Raghu manikanta</span></p>
                                <div class="dress-code-row__arrow-wrap">
                                    <svg class="dress-code-arrow" viewBox="0 0 138 46" aria-hidden="true"><g><path class="dress-code-arrow__shaft" d="M 10 7 C 9 22, 22 38, 52 41 C 82 44, 112 36, 126 28" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path><path class="dress-code-arrow__head" d="M 118 24 L 126 28 L 122 33" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                                </div>
                            </div>
                            <figure class="dress-code-polaroid dress-code-polaroid--cw">
                                <img src="${IMAGES.groom}" alt="Raghu manikanta" loading="lazy" onerror="this.src='https://placehold.co/400x400/e3d4c4/8b5a2b?text=Raghu'">
                            </figure>
                        </article>
                        <article class="dress-code-row dress-code-row--photo-first">
                            <div class="dress-code-row__text">
                                <p class="dress-code-row__names"><span class="dress-code-row__name-line">Harshitha</span></p>
                                <div class="dress-code-row__arrow-wrap">
                                    <svg class="dress-code-arrow" viewBox="0 0 138 46" aria-hidden="true"><g transform="translate(138 0) scale(-1 1)"><path class="dress-code-arrow__shaft" d="M 10 7 C 9 22, 22 38, 52 41 C 82 44, 112 36, 126 28" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path><path class="dress-code-arrow__head" d="M 118 24 L 126 28 L 122 33" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                                </div>
                            </div>
                            <figure class="dress-code-polaroid dress-code-polaroid--ccw">
                                <img src="${IMAGES.bride}" alt="Harshitha" loading="lazy" onerror="this.src='https://placehold.co/400x400/e3d4c4/a55c2a?text=Harshitha'">
                            </figure>
                        </article>
                    </div>
                </section>
                
                <section class="countdown-section">
                    <button type="button" class="countdown-play-fab" id="musicToggleBtn" aria-label="Play music">
                        <svg class="countdown-play-fab__icon countdown-play-fab__icon--play" viewBox="0 0 24 24"><path d="M9 6.5v11L18 12 9 6.5z" fill="currentColor"/></svg>
                    </button>
                    <p class="countdown-section__header">The event starts in:</p>
                    <div class="countdown-section__timer" aria-live="polite">
                        <div class="countdown-section__units">
                            <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-days">0</span><span class="countdown-unit__label">Days</span></div>
                            <span class="countdown-sep" aria-hidden="true">:</span>
                            <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-hours">00</span><span class="countdown-unit__label">Hours</span></div>
                            <span class="countdown-sep" aria-hidden="true">:</span>
                            <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-mins">00</span><span class="countdown-unit__label">Minutes</span></div>
                            <span class="countdown-sep" aria-hidden="true">:</span>
                            <div class="countdown-unit"><span class="countdown-unit__value" id="countdown-secs">00</span><span class="countdown-unit__label">Seconds</span></div>
                        </div>
                    </div>
                </section>
                
                <section class="closing-message-card">
                    <div class="closing-message-card__image-wrap">
                        <img src="${IMAGES.closing}" alt="Raghu manikanta & Harshitha" class="closing-message-card__image" onerror="this.src='https://placehold.co/800x400/e9dfd2/b5703a?text=Celebration'">
                        <div class="closing-message-card__image-gradient" aria-hidden="true"></div>
                    </div>
                    <div class="closing-message-card__panel">
                        <p class="closing-message-card__script">Hope to see you there!</p>
                        <p class="closing-message-card__script">We Welcome You and your family!</p>
                        <p class="closing-message-card__names">Raghu manikanta &amp; Harshitha</p>
                        <span class="closing-message-card__heart" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41 1.01 4.5 2.09C11.09 5.01 12.76 4 14.5 4 16.58 4 18 5.42 18 7.5c0 3.78-3.4 6.86-8.55 11.54L12 20.35z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"></path></svg>
                        </span>
                    </div>
                </section>
            </div>
        `;
        
        root.innerHTML = html;
        
        const musicBtn = document.getElementById('musicToggleBtn');
        if (musicBtn) {
            musicBtn.addEventListener('click', toggleMusic);
        }
        
        startCountdown();
    }
    
    // ========== INITIAL RENDER ==========
    renderLockScreen();
})();
