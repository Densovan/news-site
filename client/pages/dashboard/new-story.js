import styles from '../../styles/new-story.module.css';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Col, Row, Form, Input, Select } from 'antd';

const { Option } = Select;
const NewStory = () => {
    
    const [value, setValue] = useState({
        title: "",
        thumnail: ""
    });
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const fileInputRef = useRef(null)
    const onFinish = (e) => {
        e.preventDefault();
        console.log(image);
    }
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image)
        }else{
            setPreview(null)
        }
    }, [image])

    const childrenCategory = [];
    const childrenType = [];

    for (let i = 10; i < 36; i++) {
      childrenCategory.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      childrenType.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return(
        <Fragment>
            <div className="container">
                <h1>Write Story</h1>
                <div className="section-content">
                    <Row gutter={[16, 16]}>
                        <Col span={16}>
                            <form onSubmit={onFinish}>
                                <div className={styles.input_title}>
                                    <input type="text" onChange={(event) => setValue({...value, ["title"]:event.target.value})} value={value.title} placeholder="Title" name="title" />
                                </div>
                                <div>
                                    {preview ? (
                                        <img src={preview} className={styles.thumnail} />
                                    ):(
                                        <button className={styles.upload_thumnail} onClick={(e) => {
                                            e.preventDefault();
                                            fileInputRef.current.click()
                                        }}>
                                            Add Image
                                        </button>
                                    )}
                                    <input 
                                        style={{ display: 'none' }}
                                        type="file" ref={fileInputRef} 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && file.type.substr(0, 5) === "image") {
                                                setImage(file);
                                            }else{
                                                setImage(null);
                                            }
                                            
                                        }}
                                    />
                                </div>
                                <div className={styles.text_story}>
                                    <input type="text" placeholder="Tell your story ..." />
                                </div>
                            </form>
                        </Col>
                        <Col span={8}>
                            <div className={styles.contain_select}>
                                <div className={styles.title}>
                                    <label>Category</label>
                                </div>
                                <Select size="large" defaultValue="Please select category" onChange={console.log("hello")} style={{ width: '100%' }}>
                                  {childrenCategory}
                                </Select>
                            </div>
                            <div className={styles.contain_select}>
                                <div className={styles.title}>
                                    <label>Type</label>
                                </div>
                                <Select size="large" defaultValue="Please select type" onChange={console.log("hello")} style={{ width: '100%' }}>
                                  {childrenType}
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}

export default NewStory;