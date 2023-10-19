Vue.createApp({
  data() {
    return {
      loading: true,
      kind: '',
      username: 'A',
      email: 'a@a',
      company: '',
      phone: '',
      text: 'AA',
      stepView: 1,
      message: '',
    };
  },

  mounted() {
    setTimeout(() => { this.loading = false; }, 1);
  },

  methods: {
    onSubmit() {
      this.message = '';
      const required = this.kind && this.username && this.email && this.text;
      if (!required) {
        this.message = '必須項目を入力してください。';
        return;
      }
      if (!this.preview) {
        this.stepView++;
        return;
      }
      const logger = console;
      const kind = '種類';
      const username = 'お名前';
      const email = 'メールアドレス';
      const company = '会社名';
      const phone = '電話';
      const text = '要望欄';
      const body = JSON.stringify({
        origin: 'emplo.jp',
        [kind]: this.kind,
        [username]: this.username,
        [email]: this.email,
        [company]: this.company,
        [phone]: this.phone,
        [text]: this.text,
      });
      this.loading = true;
      fetch('https://ah1t85s636.execute-api.ap-northeast-1.amazonaws.com/v1/sendMail', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      .then(res => {
        if (res.status !== 200) throw new Error(res.status.toString());
        this.stepView++;
      })
      .catch(e => {
        logger.error(e);
        this.message = 'エラーが発生しました。後ほどもう一度お試しください。';
      })
      .then(() => {
        setTimeout(() => { this.loading = false; }, 1000);
      });
    },

    onCancel() {
      this.message = '';
      this.stepView--;
    },
  },
}).mount('#article');
