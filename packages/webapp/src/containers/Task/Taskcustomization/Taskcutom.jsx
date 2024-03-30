import React from 'react'

const Taskcutom = () => {
  return (
    <>
       <h3 style={{ marginTop: '6rem', marginBottom: '3rem' }}>There are no tasks to display</h3>
      <div className="container">
        <h2 style={{ color: 'black', fontFamily: 'Poppins', marginBottom: '3rem' }}>
          Create A Task
        </h2>
        <h4 style={{ color: 'black', fontFamily: 'Poppins', marginBottom: '3rem' }}>
          Select task type
        </h4>
        <div className={mainclasses.root}>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '25vh',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#ffff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={cleanIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Clean
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#ffff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={fieldwordIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Field work
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#ffff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={harvestIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Harvest
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#ffff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={irrigationIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Irrigation
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '25vh',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  backgroundColor: '#ffff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={pestcontrollIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Pest controll
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              className={mainclasses.paper}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s',
                cursor: 'pointer',
                hover: {
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                },
              }}
            >
              {' '}
              <img src={plantingIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Planting
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                alignItems: 'center',
                height: '25vh',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s ease', // Optional: Adds a smooth transition effect
                ':hover': {
                  background: '#fff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={soilamendmentIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Soil amendment
              </Typography>
            </Paper>
          </div>
          <div className={mainclasses.Cardcontainer}>
            <Paper
              elevation={1}
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                height: '25vh',
                alignItems: 'center',
                flexDirection: 'column',
                background: '#f2f7f7',
                transition: 'background 0.3s ease', // Optional: Adds a smooth transition effect
                ':hover': {
                  background: '#fff',
                  borderColor: '#4bc7c3',
                },
              }}
            >
              {' '}
              <img src={transplantIcon} />
              <Typography variant="h6" style={{ color: '#000', fontSize: '13px' }}>
                Transplant
              </Typography>
            </Paper>
          </div>
        </div>
      </div>

      <div className="conatiner h-25  d-flex mb-4">
        <div className="container   w-50">
          <div className="container">
            <h3
              style={{
                color: '#454949',
                fontWeight: '300',
                fontFamily: 'Poppins',
                fontSize: '22px',
              }}
            >
              Select the task date
            </h3>
            <Datepicker />
          </div>
          <h3
            style={{
              color: '#454949',
              fontWeight: '300',
              fontFamily: 'Poppins',
              fontSize: '22px',
              marginLeft: '1rem',
            }}
          >
            Tell us About the Field Work Task
          </h3>
          <div className="container" style={{ marginBottom: '3rem' }}>
            <Taskfropdown />
          </div>
          <h3
            style={{
              color: '#454949',
              fontWeight: '300',
              fontFamily: 'Poppins',
              fontSize: '22px',
              marginLeft: '1rem',
            }}
          >
            Do you want to assign the task now?
          </h3>
          <div className="col-md-5 mb-4">
            <select
              className="form-select"
              id="country"
              required=""
              fdprocessedid="t861mh"
              style={{ height: '63px', width: '25rem', color: '#ccc', marginLeft: '1rem' }}
            >
              <option value="">AW creation</option>
              <option>United States</option>
            </select>
            <div className="invalid-feedback">Please select a valid country.</div>
          </div>
          <div className="container">
            <h3 style={{ fontWeight: '300', fontFamily: 'Poppins', fontSize: '18px' }}>
              AW Creation doesn't currently have an hourly wage assigned.
            </h3>
            <h3
              style={{
                color: '#454949',
                fontWeight: '300',
                fontFamily: 'Poppins',
                fontSize: '22px',
                marginTop: '2rem',
              }}
            >
              Would you like to set an hourly wage?
            </h3>
          </div>
          <div className="container my-3">
            <Taskcheck />
          </div>
          <h3
            style={{
              color: '#454949',
              fontWeight: '300',
              fontFamily: 'Poppins',
              fontSize: '22px',
              marginTop: '0rem',
              marginLeft: '1rem',
            }}
          >
            Select the Task Date
          </h3>
          <div className="container d-flex my-3">
            <TextField
              id="filled-full-width"
              variant="outlined"
              sx={{
                margin: 8,
                width: '25rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              placeholder="Hourly wage"
              margin="normal"
              inputProps={{
                shrink: true,
                style: { color: 'black' },
                border: '1px solid #000',
                borderRadius: '8px',
              }}
            />
            <Button className={`${classes.saveButton}`} style={{ height: '4rem', top: '7px' }}>
              <span style={{ height: '-1rem' }}>Save</span>
            </Button>
          </div>
        </div>
        <div className="container w-50">
          <div className="container">
            <h3
              style={{
                color: '#454949',
                fontWeight: '300',
                fontFamily: 'Poppins',
                fontSize: '22px',
                marginLeft: '1rem',
              }}
            >
              Select the task location(s)
            </h3>
            <div className="container map-container" style={{ borderRadius: '8px' }}>
              <img style={{ borderRadius: '8px' }} src={mapimg}></img>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`container d-flex my-3 }`}
        style={{
          height: '16rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f2f7f7',
          top: '14rem',
          position: 'relative',
        }}
      >
        <div className="container d-block">
          <h3
            style={{
              color: '#454949',
              fontWeight: '300',
              fontFamily: 'Poppins',
              fontSize: '22px',
              marginLeft: '1rem',
              marginTop: '2rem',
            }}
          >
            Manage Custom Tasks
          </h3>
        </div>
        <div
          className="container "
          style={{ top: '100px', left: '-20rem', width: '109vw', position: 'relative' }}
        >
          <div className="container d-flex">
            <TextField
              id="standard-full-width"
              placeholder="Custom task type"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
              margin="normal"
              inputProps={{
                shrink: true,
                style: { color: 'black' },
                border: '1px solid #000',
                borderRadius: '8px',
              }}
            />
          </div>
          <Button
            className={`${classes.saveButton}`}
            style={{ height: '4rem', top: '-68px', left: '35rem' }}
          >
            <div style={{ height: '-1rem' }}>Save</div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Taskcutom
