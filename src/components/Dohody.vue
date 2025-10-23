<template>
  <div class="section" id="dohodySection">
    <h2>DOHODY A JINÁ UJEDNÁNÍ</h2>

    <!-- 1) Místo pro montáž výčepní hlavy -->
    <div class="row">
      <label>1) Místo pro montáž výčepní hlavy</label>
      <div>
        zásuvka 230V/16A/B pro trafo:
        <input type="radio" value="ano" v-model="s.dohody.hlava_zasuvka" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.hlava_zasuvka" /> NE
        <br><br>
        pracovní deska výčepu:
        <input type="radio" value="ano" v-model="s.dohody.hlava_pracdeska" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.hlava_pracdeska" /> NE
        <br>
        otvor v desce:
        <input type="radio" value="ano" v-model="s.dohody.hlava_otvor" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.hlava_otvor" /> NE
        <br>
        Materiál desky:
        <input type="checkbox" value="kuch_deska" v-model="s.dohody.hlava_material" /> kuch. deska
        <input type="checkbox" value="masiv" v-model="s.dohody.hlava_material" /> masiv
        <input type="checkbox" value="nerez" v-model="s.dohody.hlava_material" /> nerez
        <input type="checkbox" value="beton" v-model="s.dohody.hlava_material" /> beton
        <input type="checkbox" value="kamen" v-model="s.dohody.hlava_material" /> kámen
        <input type="text" v-model="s.dohody.hlava_material_jiny" placeholder="jiný materiál" />
      </div>
    </div>

    <!-- 2) Prostor pro chladič -->
    <div class="row">
      <label>2) Prostor pro chladič</label>
      <div>
        zásuvka 230V/16A/B:
        <input type="radio" value="ano" v-model="s.dohody.chl_zasuvka" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.chl_zasuvka" /> NE
        <br>
        dostatečný prostor pro odvětrání:
        <input type="radio" value="ano" v-model="s.dohody.chl_odvetrani" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.chl_odvetrani" /> NE
        <br>
        podstavec pod chladič:
        <input type="radio" value="ano" v-model="s.dohody.chl_podstavec" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.chl_podstavec" /> NE
        <br>
        <input type="text" v-model="s.dohody.chl_poznamka_dohody" placeholder="poznámka k prostoru" />
      </div>
    </div>

    <!-- 3) Prostor pro sudy -->
    <div class="row">
      <label>3) Prostor pro sudy</label>
      <div>
        přívod studené vody:
        <input type="radio" value="ano" v-model="s.dohody.sudy_voda" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.sudy_voda" /> NE
        <br>
        kulový uzávěr:
        <select v-model="s.dohody.sudy_kulovy">
          <option value="">-- vyber --</option>
          <option value="3/8">3/8"</option>
          <option value="1/2">1/2"</option>
          <option value="3/4">3/4"</option>
          <option value="ne">ne</option>
        </select>
        <br>
        zajištění tlakové lahve:
        <input type="radio" value="ano" v-model="s.dohody.sudy_tlak" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.sudy_tlak" /> NE
        <br>
        dochlazení k sudům:
        <input type="radio" value="ano" v-model="s.dohody.sudy_dochlazeni" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.sudy_dochlazeni" /> NE
        <br>
        <input type="text" v-model="s.dohody.sudy_poznamka" placeholder="poznámka k sudům" />
      </div>
    </div>

    <!-- 4) Stavební připravenost -->
    <div class="row">
      <label>4) Stavební připravenost</label>
      <div>
        potrubní cesta – průrazy stěn, stropů, podlah:
        <input type="radio" value="ano" v-model="s.dohody.stav_prurazy" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.stav_prurazy" /> NE
        <br>
        chránička pro python Ø120 mm, max. ohyb 30°:
        <input type="radio" value="ano" v-model="s.dohody.stav_chranicka" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.stav_chranicka" /> NE
        <br>
        provlekací lanko:
        <input type="radio" value="ano" v-model="s.dohody.stav_lanko" /> ANO
        <input type="radio" value="ne" v-model="s.dohody.stav_lanko" /> NE
        <br>
        <input type="text" v-model="s.dohody.stav_poznamka" placeholder="poznámka ke stavební připravenosti" />
      </div>
    </div>

    <!-- 5) Další specifikace, ujednání -->
    <div class="row">
      <label>5) Další specifikace, ujednání</label>
      <textarea v-model="s.dohody.dohody_poznamka" rows="3" placeholder="Poznámky, specifické požadavky..."></textarea>
    </div>

    <!-- 6) Předány pokyny k přípravě instalace VT? -->
    <div class="row">
      <label>6) Předány pokyny k přípravě instalace VT?</label>
      <div>
        <label><input type="radio" value="ano" v-model="s.dohody.pokyny_vt" /> ANO</label>
        <label><input type="radio" value="ne" v-model="s.dohody.pokyny_vt" /> NE</label>
      </div>
    </div>

    <!-- 7) Demontáž VT -->
    <div class="row">
      <label>7) Demontáž VT</label>
      <div>
        <textarea v-model="s.demontaz_poznamky" rows="3" placeholder="Poznámky, specifické požadavky..."></textarea>
      </div>
    </div>

    <!-- 8) KOFOLA -->
    <div class="row">
      <label>8) KOFOLA</label>
      <div class="opts" style="align-items:center;">
        <label><input type="checkbox" value="kohout" v-model="s.kofola" /> VÝČEPNÍ KOHOUT</label>
        <label><input type="checkbox" value="narazec" v-model="s.kofola" /> NARAŽEČ</label>
        <label><input type="checkbox" value="plaketa" v-model="s.kofola" /> PLAKETA</label>
        <label><input type="checkbox" value="myci_hlava" v-model="s.kofola" /> MYCÍ HLAVA</label>
        <textarea v-model="s.kofola_poznamka" rows="3" placeholder="Poznámky, specifické požadavky..."></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
