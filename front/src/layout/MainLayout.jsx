import React from "react";
import {Col, Row} from 'antd';
import './mainLayout.css';
import MenuComponent from "../components/menuComponent";

let leftColSize={ xs: 24, sm: 12, md: 8, lg: 4 }
let rightColSize={ xs: 24, sm: 12, md: 16, lg: 20 }

const LayoutComponent = ({rightContent, backgroundColor, title}) => {
    return (
        <div className="layout-container" style={{backgroundColor:backgroundColor}}>
            <Row>
                <Col xs={leftColSize.xs} sm={leftColSize.sm} md={leftColSize.md} lg={leftColSize.lg}>
                    <div className="content-left">
                        <MenuComponent/>
                    </div>
                </Col>

                <Col xs={rightColSize.xs} sm={rightColSize.sm} md={rightColSize.md} lg={rightColSize.lg}>
                    <div className="content-right">
                        <h2 style={{color:"white"}}>{title}</h2>
                        {rightContent}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default LayoutComponent;