Vue.component("header-component", {
  props: ["name"],
  template: `
    <header>
      <img width="50" src="https://docs.vuejs.id/images/logo.png" alt="vue-brand">
      <h1>Hi! <span>{{name}}</span></h1>
      <code>Online</code>
    </header>
    <nav>
      <a href="#" :class="{active: nav === 'add'}" @click.prevent="gantiMenu('add')">Add</a>
      <a href="#" :class="{active: nav === 'update'}" @click.prevent="gantiMenu('update')">Update</a>
      <a href="#" :class="{active: nav === 'remove'}" @click.prevent="gantiMenu('remove')">Remove</a>
    </nav>
`,
  data() {
    return {
      name: "User",
    };
  },
});

Vue.component("footer-component", {
  template: `
  <footer>
   <slot></slot>
 </footer>
  `,
});

Vue.component("main-component", {
  props: ["items", "menu"],
  template: `
   <div>
    <div class="img-header">
      <img :src="kelasImg" alt="brand" width="350">
    </div>
    <h4>Tambah Kelas</h4>

    <article>
      <h4>Menu {{ menu }}</h4>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae temporibus adipisci consequuntur ea
        quidem
        itaque ad accusantium aut eum amet molestiae voluptatum quae facere quis, ex veritatis id dignissimos vitae
        non,
        minus exercitationem placeat. Suscipit, qui. Dicta voluptate dolore doloribus? Dolor, magni labore vel
        voluptatibus harum necessitatibus odio hic ad.</p>
    </article>

    <h3>Daftar Kelas ({{items.length}})</h3>

      <ul v-if="items.length">
        <li v-for="(item , index) of items">
          {{ index+1 }} - {{item.judul}}
          <a href="" @click.prevent="$emit('hapuskelas', index)">Hapus</a>
        </li>
      </ul>

    <p v-else>Kelas tidak tersedia</p>

    <aside v-once>
      Kelas 
      <code :class="[ isActive ? 'succes' : 'danger' ]" style="padding: 3px;">
        {{isActive ? 'Complite' : 'Null'}}
      </code>
      
      <ul>
        <li v-for="fam in family">
          {{fam}}
        </li>
      </ul>
    </aside>

  </div>
  `,

  data() {
    return {
      family: ["Html", "Css", "Js"],
      isActive: true,
      kelasImg:
        "https://scotch-res.cloudinary.com/image/upload/w_1050,q_auto:good,f_auto/v1559156220/a2dnwyg5xotyhvyhmscj.jpg",
    };
  },
  methods: {},
});

const Home = {
  template: "<div>Home Page</div>",
};
const About = {
  template: "<div>About Page</div>",
};
const Kelas = {
  props: ["items", "menu"],
  template: `
   <div>
    <div class="img-header">
      <img :src="kelasImg" alt="brand" width="350">
    </div>
    <h4>Tambah Kelas</h4>

    <form @submit.prevent='submitKelas'>
      <div class="input-group">
        <input v-model="kelas.judul" type="text" placeholder="Nama Kelas">
        <span class="error">{{error.judul }}</span>
      </div>
      <div class="input-group">
        <label>Deskripsi: </label><br>
        <textarea v-model="kelas.deskripsi"></textarea>
        <span class="error">{{error.deskripsi }}</span>
      </div>

      <div class="input-group">
        <p><img :src="previewImg" v-if="previewImg" width="100" /></p>
        <label>Masukkan Gambar: </label><br>
        <input ref="gambar" @change="upload" type="file">
      </div>
      <button type="submit">Submit</button>
    </form>

    <article>
      <h4>Menu {{ menu }}</h4>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae temporibus adipisci consequuntur ea
        quidem
        itaque ad accusantium aut eum amet molestiae voluptatum quae facere quis, ex veritatis id dignissimos vitae
        non,
        minus exercitationem placeat. Suscipit, qui. Dicta voluptate dolore doloribus? Dolor, magni labore vel
        voluptatibus harum necessitatibus odio hic ad.</p>
    </article>

    <h3>Daftar Kelas ({{items.length}})</h3>

      <ul v-if="items.length">
        <li v-for="(item , index) of items">
        <img :src="item.gambar" width="100"/>
         <p> 
         {{ index+1 }} - {{item.judul}}
          <a href="" @click.prevent="$emit('hapuskelas', item.id)">Hapus</a>
          <router-link :to="'/kelas/' + item.id ">Lihat Kelas</router-link>
         </p>
        </li>
      </ul>

    <p v-else>Kelas tidak tersedia</p>

    <aside v-once>
      Kelas 
      <code :class="[ isActive ? 'succes' : 'danger' ]" style="padding: 3px;">
        {{isActive ? 'Complite' : 'Null'}}
      </code>
      
      <ul>
        <li v-for="fam in family">
          {{fam}}
        </li>
      </ul>
    </aside>

  </div>
  `,

  data() {
    return {
      family: ["Html", "Css", "Js"],
      isActive: true,
      kelasImg:
        "https://scotch-res.cloudinary.com/image/upload/w_1050,q_auto:good,f_auto/v1559156220/a2dnwyg5xotyhvyhmscj.jpg",
      kelas: {
        judul: "",
        deskripsi: "",
        gambar: "",
      },
      previewImg: "",
      error: {
        judul: "",
        deskripsi: "",
      },
    };
  },
  methods: {
    submitKelas() {
      this.error.judul = "";
      this.error.deskripsi = "";

      if (this.kelas.judul == "") {
        this.error.judul = "Judul is Required";
      }
      if (this.kelas.deskripsi == "") {
        this.error.deskripsi = "Deskripsi is Required";
      }

      if (this.kelas.judul && this.kelas.deskripsi) {
        const data = {
          id: uuidv4(),
          judul: this.kelas.judul,
          deskripsi: this.kelas.deskripsi,
          gambar: this.kelas.gambar,
        };
        this.$emit("submitkelas", data);

        this.kelas.judul = "";
        this.kelas.deskripsi = "";
        this.kelas.gambar = "";
        this.previewImg = "";
        this.$refs.gambar.value = "";
      }
    },
    upload(event) {
      const namagambar = event.target.files[0].name;
      this.kelas.gambar = namagambar;
      this.previewImg = URL.createObjectURL(event.target.files[0]);
    },
  },
};

const NotFound = {
  template: "<div>404 Halaman Tidak Ditemukan</div>",
};

const detailKelas = {
  template: `<div>
  <img src="" width="200" alt="img" />
  <h3>{{detailKelas.judul}} - {{$route.params.idkelas}}</h3>
  <p>{{detailKelas.deskripsi}}</p> 
  <router-link to="/kelas">kembali</router-link>
  </div>`,
  data() {
    return {
      detailKelas: {},
    };
  },
  created() {
    this.filterkelas();
  },
  methods: {
    filterkelas() {
      let kelas = JSON.parse(localStorage.getItem("kelas"));
      let id = this.$route.params.idkelas;
      let item = kelas.filter((k) => k.id == id);
      this.detailKelas = item[0];
    },
  },
};
