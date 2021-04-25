declare namespace Models {
  interface Modal {
    visible: boolean;
    type: 'success' | 'error';
    title: string;
    content: string;
  }
}
