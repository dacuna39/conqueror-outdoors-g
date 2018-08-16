
import React from 'react';
import Wrapper from '../components/Containers/Wrapper';
import Section from '../components/Containers/Section';
import H from '../components/H';
import Button from '../components/Button';

//fuctions
import PrintPrice from '../functions/PrintPrice';

function renderOrderItems(items) {

  return items.map((item, index) => {
    //get selected options
    const options = item.options.map((opt) => {
      //console.log('choice', opt.choice);
      return opt.choice + ', ';
    })

    return (
      <div key={index} className='order-item' style={{ marginBottom: '1em' }}>
        <Wrapper style={{ justifyContent: 'space-between' }}>
          <section style={{ maxWidth: '370px' }}> <strong> {item.name} </strong> </section>
          <section style={{ width: '40px' }}> Qt: {item.quantity} </section>
        </Wrapper>
        <div> {options} </div>
      </div>
    );
  })
}

function renderShippingDetails(order, show) { //on order confirmation page, dont show empty tracking info, etc.
  if (show) {
    const dateOrdered = new Date(order.timestamp * 1000); //in seconds

    return (
      <section style={{ marginTop: '1em' }}>
        <div> Order Number: {order.orderNumber} </div>
        <br />
        <div style={{ fontSize: '28px' }}>
          <strong> Status: {order.orderStatus} </strong>
        </div>
        <div> {order.statusDescription}</div>
        <br />
        <div> Ordered {dateOrdered.toDateString()} </div>
        <br />
        <div> Carrier: {order.carrier} </div>
        <div> Tracking Number: {order.trackingNumber} </div>
      </section>
    );
  }
  else {
    return null;
  }
}

export default function (order, showShippingDetails, cancelFunc) { //show is bool
  if (order.items !== undefined && order.items.length > 0) {

    let items = {};
    try {
      items = JSON.parse(order.items);
    }
    catch (err) {
      return null;
    }



    return (
      <div style={{ textAlign: 'left', fontSize: '18px', borderBottom: '3px solid #eee' }}>
        {renderShippingDetails(order, showShippingDetails)}

        <Wrapper style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Section style={{ width: '450px'}}>
            <div style={{ borderBottom: '1px solid #eee' }}> <strong> Items </strong> </div>
            <br />
            {renderOrderItems(items)}
          </Section>

          <Section style={{ width: '200px'}}>
            <div style={{ borderBottom: '1px solid #eee' }}> <strong> Order Total </strong> </div>
            <br />
            <Wrapper style={{ justifyContent: 'space-between' }}>
              <section style={{textAlign: 'left'}}>
              <div> SubTotal </div>
                <div> Shipping </div>
                <div> Tax </div>  
              </section>
              <section style={{textAlign: 'right'}}>
                <div> ${PrintPrice(order.subTotal)} </div>
                <div> ${PrintPrice(order.shippingPrice)} </div>
                <div> ${PrintPrice(order.tax)} </div>       
              </section>
            </Wrapper>
            <hr />
            <Wrapper style={{ justifyContent: 'space-between' }}>
              <section style={{textAlign: 'left'}}>
                <div> Total </div>
              </section>
              <section style={{textAlign: 'right'}}>
                <div> ${PrintPrice(order.finalPrice)} </div>
              </section>
            </Wrapper>
          </Section>

          <Section style={{ width: '300px', textAlign: 'left', padding: '1em 0' }}>
            <div style={{ borderBottom: '1px solid #eee' }}> <strong> Shipping Address </strong> </div>
            <br />
            <div> {order.customerName} </div>
            <div> {order.shippingStreet} </div>
            <div> {order.shippingStreet2} </div>
            <div> {order.shippingCity}, {order.shippingState} {order.shippingZip} </div>
          </Section>

          <Section>
            <Button onClick={() => cancelFunc()}> Cancel Order </Button>
          </Section>
        </Wrapper>
      </div>
    );
  }
  else {
    return (
      <Wrapper style={{ height: '200px', justifyContent: 'center', alignItems: 'center' }}>
        <H> No Orders Found </H>
      </Wrapper>
    );
  }
}
