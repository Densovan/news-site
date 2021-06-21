// Editor options
export const options = {
  placeholder: 'Tell you story ...',
  autofocus: true,

  /**
   * onReady callback
   */
  onReady: () => { console.count('READY callback') },

  /**
   * onChange callback
   */
  onChange: () => { console.count('CHANGE callback') },
};
