<script setup>
import { ref, onMounted } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import PrimaryButton from '/src/uikit/PrimaryButton.vue';
import DestructiveButton from '/src/uikit/DestructiveButton.vue';
import { store, getDraft, saveStore, Entry } from '/src/store.js'
import * as ArweaveKit from '/src/utils/arweavekit.js'
import UploadImages from "/src/uikit/ImagePicker.vue";

let entryPlaceholder = "Sup? Write your journal entry here";

const draft = ref(new Entry());
const photos = ref([]);

onMounted(() => {
    draft.value = getDraft();
})

function deleteDraft() {
    draft.value.date = Date();
    draft.value.content = null;
    draft.value.photos = null;
    saveStore();
}

function publishDraft() {
    draft.value.photos = photos;
    ArweaveKit.publish(draft.value).then(ok => {
        if (ok) {
            deleteDraft();
        }
    });    
}

function onFileChange(e) {
    const file = e.target.files[0];
    photoUrl.value = URL.createObjectURL(file);
}

const imageMaxSize = 500;

// Read file, resize it and return the Base64 data URL in a promise
function readAsDataURL(file) {
    return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function(readerEvent) {
            // resolve(fr.result);

            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > imageMaxSize) {
                        height *= imageMaxSize / width;
                        width = imageMaxSize;
                    }
                } else {
                    if (height > imageMaxSize) {
                        width *= imageMaxSize / height;
                        height = imageMaxSize;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                console.log("Resized len", dataUrl.length);
                resolve(dataUrl);
            }
            image.src = readerEvent.target.result;
        };
        fr.onerror = function () {
            reject(fr);
        };
        fr.readAsDataURL(file);
    });
}

function handleImages(files){
    console.log("files", files);
    
    let readers = [];
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
        readers.push(readAsDataURL(files[i]));
    }
    Promise.all(readers).then((values) => {
        console.log("Images in Base64", values);
        photos.value = values;
    });
}

</script>

<template>
    <div class="text-left m-2">
        <Datepicker v-model="draft.date" class="pb-2" placeholder="Entry date" textInput autoApply required :enableTimePicker="false" position="left" monthNameFormat="long"></Datepicker>

        <textarea id="message" rows="15" class="block p-4 w-full text-lg text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="entryPlaceholder" v-model="draft.content"></textarea>

        <UploadImages class="mt-2" @changed="handleImages" max=1 uploadMsg="Click to upload or drop photos here" />

        <div class="flex mt-4 float-right">
            <div class="ml-4">
                <DestructiveButton @click="deleteDraft">Delete</DestructiveButton>
                <PrimaryButton @click="saveStore">Save Draft</PrimaryButton>
                <PrimaryButton @click="publishDraft">Publish</PrimaryButton>
            </div>
        </div>

        <div class="container mx-auto px-2">
            <p class="float-right text-right">{{ ArweaveKit.txnStatus.value }}</p>
        </div>

        <!-- Resized photos 
        <div class="flex">
            <img v-for="(photo, index) in photos" key="index" :src="photo" class="p-2 object-contain" />
        </div> 
        -->

    </div>
</template>
