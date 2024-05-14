import React, { useState } from 'react'
import { Button, Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { Buffer } from 'buffer';
import "./style.css"
const GroomCard = ({ data }) => {

  const [lookingFor, setLookingFor] = useState()
  console.log("lookingFor", lookingFor)

  const base64String = Buffer.from(data.photo.data).toString('base64');

  // Construct the data URL for the image
  const imageUrl = `data:${data.photo.contentType};base64,${base64String}`;
  return (
    <Card
      style={{
        //   width: '18rem',
        marginBottom: "25px"
      }}
    >
      <img
        alt="Sample"
        src={imageUrl}
      />
      <CardBody>
        <CardTitle tag="h5">
          Groom info:
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Name: {data.name}
        </CardSubtitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          City: {data.city}
        </CardSubtitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Sect: {data.sect}

        </CardSubtitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Education: {data.qualification}
        </CardSubtitle>
        {
          lookingFor === data._id && <>

            <p className='looking-for'>Looking for</p>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Age: {data.requirements.requiredAge}
            </CardSubtitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Height: {data.requirements.requiredHeight}

            </CardSubtitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Sect: {data.requirements.requiredSect}
            </CardSubtitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Cast: {data.requirements.requiredCast}

            </CardSubtitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Qualification : {data.requirements.requiredQualification}

            </CardSubtitle>
          </>
        }


        {/* <Button className='looking-for-btn' color='primary'>
      
      </Button> */}
        <CardLink href="#" onClick={() => { setLookingFor(data._id === lookingFor ? "" : data._id) }}>
          {
            lookingFor ? "hide" : "      Looking for          "
          }
        </CardLink>
        <CardLink href="#">
          Details
        </CardLink>
      </CardBody>
    </Card>
  )
}

export default GroomCard