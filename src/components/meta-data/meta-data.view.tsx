import type { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import type MetaDataType from '../../types/meta-data';

export default function MetaData({ date }: MetaDataType): ReactElement {
  return (
    <Jumbotron as="header" fluid>
      <Container fluid>
        <Row>
          <Col>
            <h1 style={{ display: 'inline' }}>MTGeni.us Collection</h1>
          </Col>
          <Col>
            <span>Last updated: {date}</span>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}
