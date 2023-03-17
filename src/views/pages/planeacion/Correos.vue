<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <h5>Correos</h5>
                <Editor
                    v-model="editor"
                    :options="options"
                    @blur="cambio(event)"
                    toolbar="minimal"
                    editorStyle="height: 320px"
                >
                    <template #toolbar>
                        <span class="flex">
                            <button class="ql-background"></button>
                            <button class="ql-bold"></button>
                            <button class="ql-color"></button>
                            <button class="ql-italic"></button>
                            <button class="ql-font"></button>
                            <button class="ql-code"></button>
                            <button class="ql-italic"></button>
                            <button class="ql-link"></button>
                            <button class="ql-size"></button>
                            <button class="ql-strike"></button>
                            <button class="ql-script"></button>
                            <button class="ql-underline"></button>
                            <button class="ql-blockquote"></button>
                            <button class="ql-header"></button>
                            <button class="ql-indent"></button>
                            <button class="ql-list"></button>
                            <button class="ql-align"></button>
                            <button class="ql-direction"></button>
                            <button class="ql-code-block"></button>
                            <button class="ql-image"></button>
                            <button class="ql-video"></button>
                            <Button
                                @click="startStop"
                                class="p-button-success p-button-text p-button-icon-only"
                                icon="pi pi-microphone"
                            />
                        </span>
                        <button class="ql-clean"></button>
                    </template>
                </Editor>
                <!-- <p-editor v-model="text" :style="{height: '320px'}"></p-editor> -->
                <FileUpload
                    name="demo[]"
                    url="./upload.php"
                    @upload="onTemplatedUpload($event)"
                    :multiple="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    @select="onSelectedFiles"
                >
                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                            <div class="flex gap-2">
                                <Button @click="chooseCallback()" icon="pi pi-images" class="p-button-rounded">
                                </Button>
                                <Button
                                    @click="uploadCallback()"
                                    icon="pi pi-cloud-upload"
                                    class="p-button-rounded p-button-success"
                                    :disabled="!files || files.length === 0"
                                ></Button>
                                <Button
                                    @click="clearCallback()"
                                    icon="pi pi-times"
                                    class="p-button-rounded p-button-danger"
                                    :disabled="!files || files.length === 0"
                                ></Button>
                            </div>
                            <ProgressBar
                                :value="totalSizePercent"
                                :showValue="false"
                                :class="[
                                    'md:w-20rem h-1rem w-full md:ml-auto',
                                    { 'exceeded-progress-bar': totalSizePercent > 100 }
                                ]"
                                ><span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span></ProgressBar
                            >
                        </div>
                    </template>
                    <template #content="{ files, uploadedFiles, onUploadedFileRemove, onFileRemove }">
                        <div v-if="files.length > 0">
                            <h5>Pending</h5>
                            <div class="flex flex-wrap p-5 gap-5">
                                <div
                                    v-for="(file, index) of files"
                                    :key="file.name + file.type + file.size"
                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                >
                                    <div>
                                        <img
                                            role="presentation"
                                            :alt="file.name"
                                            :src="file.objectURL"
                                            height="50"
                                            class="shadow-2"
                                        />
                                    </div>
                                    <span class="font-semibold">{{ file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Badge value="Pending" severity="warning" />
                                    <Button
                                        icon="pi pi-times"
                                        @click="onRemoveTemplatingFile(file, onFileRemove, index)"
                                        class="p-button-outlined p-button-danger p-button-rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        <div v-if="uploadedFiles.length > 0">
                            <h5>Completed</h5>
                            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                <div
                                    v-for="(file, index) of uploadedFiles"
                                    :key="file.name + file.type + file.size"
                                    class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                                >
                                    <div>
                                        <img
                                            role="presentation"
                                            :alt="file.name"
                                            :src="file.objectURL"
                                            width="100"
                                            class="shadow-2"
                                        />
                                    </div>
                                    <span class="font-semibold">{{ file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Badge value="Completed" class="mt-3" severity="success" />
                                    <Button
                                        icon="pi pi-times"
                                        @click="onUploadedFileRemove(index)"
                                        class="p-button-outlined p-button-danger p-button-rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="flex align-items-center justify-content-center flex-column">
                            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                        </div>
                    </template>
                </FileUpload>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const reconocimiento = new window.webkitSpeechRecognition();
reconocimiento.lang = 'es-ES';
reconocimiento.continuous = true;
reconocimiento.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript);
    editor.value = transcript;
};

const startStop = () => {
    if (reconocimiento.continuous) {
        reconocimiento.stop();
        reconocimiento.continuous = false;
    } else {
        reconocimiento.start();
        reconocimiento.continuous = true;
    }
};

const editor = ref('prueba');
const totalSizePercent = ref(0);
const files = ref([]);
const totalSize = ref(0);
const options = reactive({
    debug: 'info',
    modules: {
        toolbar: ['bold', 'italic', 'underline']
    },
    placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow'
});

const formatSize = (bytes) => {
    if (bytes === 0) {
        return '0 B';
    }

    let k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const onRemoveTemplatingFile = (file, onFileRemove, index) => {
    onFileRemove(index);
    totalSize.value -= parseInt(this.formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};
</script>

<style lang="scss" scoped></style>
