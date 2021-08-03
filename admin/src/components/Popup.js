import {  Modal } from 'antd';

const Popup = ({ visible, setVisible, children, form, title }) => {
    return(
        <Modal
          title={
            title
          }
          visible={visible}
          onCancel={() => {setVisible(false)}}
          onOk={form.submit}
        >
          {children}
        </Modal>
    )
}

export default Popup;