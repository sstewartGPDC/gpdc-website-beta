/**
 * GPDC Image Crop Tool
 * Shared cropping logic for admin and standalone pages
 * Uses Cropper.js (loaded from CDN)
 */

const CROP_PRESETS = {
    'headshot':        { label: 'Team Headshot',       ratio: 3/4,   width: 600,  height: 800,  hint: 'Team member cards on Our Team page' },
    'executive':       { label: 'Executive Photo',     ratio: 1/1,   width: 600,  height: 600,  hint: 'Featured executive square photo' },
    'hero':            { label: 'Hero Image',          ratio: 16/9,  width: 1600, height: 900,  hint: 'Page hero backgrounds' },
    'division-header': { label: 'Division Card',       ratio: 16/9,  width: 800,  height: 450,  hint: 'Division card header images' },
    'article':         { label: 'Article / Event',     ratio: 3/2,   width: 960,  height: 640,  hint: 'Article & event featured images' },
    'free':            { label: 'Free Crop',           ratio: NaN,   width: null, height: null,  hint: 'No aspect ratio restriction' }
};

class CropTool {
    constructor(containerEl, options = {}) {
        this.container = containerEl;
        this.cropper = null;
        this.currentPreset = 'headshot';
        this.quality = 0.9;
        this.originalFile = null;
        this.presets = CROP_PRESETS;
        this.onCrop = options.onCrop || null;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="crop-tool">
                <!-- Step 1: Upload -->
                <div class="crop-upload-zone" id="cropDropZone">
                    <div class="crop-upload-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                    </div>
                    <p class="crop-upload-text">Drag & drop an image here, or <span class="crop-upload-link">click to browse</span></p>
                    <p class="crop-upload-hint">Supports JPEG, PNG, WebP</p>
                    <input type="file" id="cropFileInput" accept="image/jpeg,image/png,image/webp" hidden>
                </div>

                <!-- Step 2: Preset + Cropper (hidden until image loaded) -->
                <div class="crop-workspace" id="cropWorkspace" style="display:none;">
                    <!-- Preset selector -->
                    <div class="crop-presets" id="cropPresets"></div>

                    <!-- Cropper area -->
                    <div class="crop-canvas-wrap">
                        <img id="cropImage" style="display:block; max-width:100%;">
                    </div>

                    <!-- Controls -->
                    <div class="crop-controls">
                        <div class="crop-controls-group">
                            <button class="crop-btn" id="cropRotateLeft" title="Rotate left">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                            </button>
                            <button class="crop-btn" id="cropRotateRight" title="Rotate right">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                            </button>
                            <button class="crop-btn" id="cropFlipH" title="Flip horizontal">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><line x1="12" y1="20" x2="12" y2="4"/></svg>
                            </button>
                            <button class="crop-btn" id="cropFlipV" title="Flip vertical">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v3"/><path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
                            </button>
                            <button class="crop-btn" id="cropZoomIn" title="Zoom in">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            </button>
                            <button class="crop-btn" id="cropZoomOut" title="Zoom out">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            </button>
                            <button class="crop-btn" id="cropReset" title="Reset">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                            </button>
                        </div>
                        <div class="crop-controls-group">
                            <button class="crop-btn crop-btn-secondary" id="cropChangeImage">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                New Image
                            </button>
                        </div>
                    </div>

                    <!-- Quality + Info -->
                    <div class="crop-output-bar">
                        <div class="crop-quality">
                            <label for="cropQuality">Quality:</label>
                            <input type="range" id="cropQuality" min="50" max="100" value="90" step="5">
                            <span id="cropQualityVal">90%</span>
                        </div>
                        <div class="crop-info" id="cropInfo">
                            <span id="cropDimensions">—</span>
                        </div>
                    </div>

                    <!-- Download -->
                    <button class="crop-download-btn" id="cropDownload">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download Cropped Image
                    </button>
                </div>
            </div>
        `;

        // Build preset buttons
        this.renderPresets();
    }

    renderPresets() {
        const container = this.container.querySelector('#cropPresets');
        if (!container) return;

        let html = '';
        for (const [key, preset] of Object.entries(this.presets)) {
            const active = key === this.currentPreset ? ' active' : '';
            const dims = preset.width && preset.height ? `${preset.width}×${preset.height}` : 'Original';
            html += `
                <button class="crop-preset-btn${active}" data-preset="${key}">
                    <span class="crop-preset-label">${preset.label}</span>
                    <span class="crop-preset-dims">${dims}</span>
                </button>
            `;
        }
        container.innerHTML = html;
    }

    bindEvents() {
        const dropZone = this.container.querySelector('#cropDropZone');
        const fileInput = this.container.querySelector('#cropFileInput');

        // Click to browse
        dropZone.addEventListener('click', () => fileInput.click());

        // File selected
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                this.loadImage(e.target.files[0]);
            }
        });

        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                this.loadImage(e.dataTransfer.files[0]);
            }
        });

        // Preset buttons
        this.container.querySelector('#cropPresets').addEventListener('click', (e) => {
            const btn = e.target.closest('.crop-preset-btn');
            if (!btn) return;
            this.setPreset(btn.dataset.preset);
        });

        // Controls
        this.container.querySelector('#cropRotateLeft').addEventListener('click', () => this.cropper && this.cropper.rotate(-90));
        this.container.querySelector('#cropRotateRight').addEventListener('click', () => this.cropper && this.cropper.rotate(90));
        this.container.querySelector('#cropFlipH').addEventListener('click', () => {
            if (!this.cropper) return;
            const data = this.cropper.getImageData();
            this.cropper.scaleX(data.scaleX === -1 ? 1 : -1);
        });
        this.container.querySelector('#cropFlipV').addEventListener('click', () => {
            if (!this.cropper) return;
            const data = this.cropper.getImageData();
            this.cropper.scaleY(data.scaleY === -1 ? 1 : -1);
        });
        this.container.querySelector('#cropZoomIn').addEventListener('click', () => this.cropper && this.cropper.zoom(0.1));
        this.container.querySelector('#cropZoomOut').addEventListener('click', () => this.cropper && this.cropper.zoom(-0.1));
        this.container.querySelector('#cropReset').addEventListener('click', () => this.cropper && this.cropper.reset());

        // Change image
        this.container.querySelector('#cropChangeImage').addEventListener('click', () => {
            this.container.querySelector('#cropFileInput').click();
        });

        // Quality slider
        const qualitySlider = this.container.querySelector('#cropQuality');
        const qualityVal = this.container.querySelector('#cropQualityVal');
        qualitySlider.addEventListener('input', () => {
            this.quality = parseInt(qualitySlider.value) / 100;
            qualityVal.textContent = qualitySlider.value + '%';
        });

        // Download
        this.container.querySelector('#cropDownload').addEventListener('click', () => this.downloadCropped());
    }

    loadImage(file) {
        this.originalFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgEl = this.container.querySelector('#cropImage');
            imgEl.src = e.target.result;

            // Show workspace, hide upload zone
            this.container.querySelector('#cropDropZone').style.display = 'none';
            this.container.querySelector('#cropWorkspace').style.display = 'block';

            // Init cropper
            this.initCropper(imgEl);
        };
        reader.readAsDataURL(file);
    }

    initCropper(imgEl) {
        // Destroy existing
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }

        const preset = this.presets[this.currentPreset];
        const ratio = isNaN(preset.ratio) ? NaN : preset.ratio;

        this.cropper = new Cropper(imgEl, {
            aspectRatio: ratio,
            viewMode: 2,
            autoCropArea: 0.9,
            responsive: true,
            restore: true,
            guides: true,
            center: true,
            highlight: true,
            background: true,
            movable: true,
            rotatable: true,
            scalable: true,
            zoomable: true,
            zoomOnWheel: true,
            cropBoxResizable: true,
            crop: () => this.updateInfo()
        });
    }

    setPreset(key) {
        this.currentPreset = key;

        // Update active button
        this.container.querySelectorAll('.crop-preset-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.preset === key);
        });

        // Update cropper aspect ratio
        if (this.cropper) {
            const preset = this.presets[key];
            this.cropper.setAspectRatio(isNaN(preset.ratio) ? NaN : preset.ratio);
        }
    }

    updateInfo() {
        if (!this.cropper) return;
        const data = this.cropper.getCropBoxData();
        const preset = this.presets[this.currentPreset];
        const outW = preset.width || Math.round(data.width);
        const outH = preset.height || Math.round(data.height);
        const dimEl = this.container.querySelector('#cropDimensions');
        if (dimEl) {
            dimEl.textContent = `Output: ${outW} × ${outH}px`;
        }
    }

    downloadCropped() {
        if (!this.cropper) return;

        const preset = this.presets[this.currentPreset];
        const canvasOpts = {};
        if (preset.width && preset.height) {
            canvasOpts.width = preset.width;
            canvasOpts.height = preset.height;
        }
        canvasOpts.imageSmoothingEnabled = true;
        canvasOpts.imageSmoothingQuality = 'high';

        const canvas = this.cropper.getCroppedCanvas(canvasOpts);
        if (!canvas) return;

        // Detect format from original file
        const isPNG = this.originalFile && this.originalFile.type === 'image/png';
        const mimeType = isPNG ? 'image/png' : 'image/jpeg';
        const ext = isPNG ? 'png' : 'jpg';

        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            // Build filename
            let baseName = 'image';
            if (this.originalFile && this.originalFile.name) {
                baseName = this.originalFile.name.replace(/\.[^.]+$/, '');
            }
            a.download = `${baseName}-cropped-${this.currentPreset}.${ext}`;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
        }, mimeType, isPNG ? undefined : this.quality);
    }

    destroy() {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
}
