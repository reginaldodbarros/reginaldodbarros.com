<template>
  <div class="row">
    <div class="col">
      <h1>Tab4Dev</h1>
    </div>
  </div>
  <div class="row">
    <div class="col col-3">
      <div class="card">
        <div class="card-title">
          <h3>Base64 Encode/Decode</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Input</label>
                <textarea rows="4" class="form-control" v-model="refFormBase64.input"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn" @click="encode">Encode</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" class="btn" @click="decode">Decode</button>
            </div>
          </div>
          <div class="row" v-if="refError">
            <div class="col">
              <div class="error">
                <p>{{  refError }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Output</label>
                <textarea rows="4" class="form-control" v-model="refFormBase64.output"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-3">
      <div class="card">
        <div class="card-title">
          <h3>Color Dec to Hex</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>R</label>
                <input type="text" class="form-control" maxlength="3" v-model="refFormColor.inputR" v-mask-int>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>G</label>
                <input type="text" class="form-control" maxlength="3" v-model="refFormColor.inputG" v-mask-int>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>B</label>
                <input type="text" class="form-control" maxlength="3" v-model="refFormColor.inputB" v-mask-int>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn" @click="dectohex">Dec To Hex</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" class="btn" @click="hextodec">Hex To Dec</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Selector</label>
                <input type="color" class="form-control" v-model="refColor">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>Output</label>
                <input type="text" class="form-control" maxlength="7" v-model="refFormColor.output" v-mask-hex>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';

const refFormColor = ref({});
const refColor = ref('#000000');
const refFormBase64 = ref({});
const refError = ref('');

watch(refColor, () => {
  refFormColor.value.output = refColor.value;
});

function encode() {
  try {
    refFormBase64.value.output = btoa(refFormBase64.value.input || '');
  } catch (error) {    
    refError.value = 'error: ' + error;
  }
}

function decode() {
  try {
    refFormBase64.value.output = atob(refFormBase64.value.input || '');
  } catch (error) {
    refError.value = 'error: ' + error;
  }
}

function dectohex() {
  let r = parseInt(refFormColor.value.inputR || '0');
  let g = parseInt(refFormColor.value.inputG || '0');
  let b = parseInt(refFormColor.value.inputB || '0');
  if (r > 255) {
    refFormColor.value.inputR = 255;
    r = 255;
  }
  if (g > 255) {
    refFormColor.value.inputG = 255;
    g = 255;
  }
  if (b > 255) {
    refFormColor.value.inputB = 255;
    b = 255;
  }
  refFormColor.value.output = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  refColor.value = refFormColor.value.output;
}

function hextodec() {
  let rgb = refFormColor.value.output || '000000';
  rgb = rgb.replace('#', '');
  rgb = rgb.padEnd(6, '0');
  refFormColor.value.inputR = parseInt(rgb.substring(0, 2), 16);
  refFormColor.value.inputG = parseInt(rgb.substring(2, 4), 16);
  refFormColor.value.inputB = parseInt(rgb.substring(4, 6), 16);
  refColor.value = refFormColor.value.output;
}

onMounted(() => {
  refFormColor.value.output = refColor.value;
});
</script>