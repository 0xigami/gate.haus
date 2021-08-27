import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import CloseIcon from '@material-ui/icons/Close'
import isURL from 'validator/es/lib/isURL'

import { signMessage } from './utils/eth'
import { createLink } from './utils/cloudFunctions'

const filter = createFilterOptions()

const NFTs = [
  {
    name: 'HAUS KEY',
    address: ['0xAdf9b34B82dE3EF70BB943Db659791F44e65Af4a']
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center'
  },
  sameWidth: {
    maxWidth: 465,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  error: {
    color: 'red'
  },
  linkInput: {
    width: '100%'
  }
}))

function App () {
  const classes = useStyles()
  const [selectedContract, setSelectedContract] = useState('')
  const [selectedUrl, setSelectedUrl] = useState('')
  const [error, setError] = useState('')
  const [link, setLink] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCreateLink = async () => {
    setError('')
    setLink('')
    if (!selectedContract || !selectedUrl) {
      return
    }
    if (!isURL(selectedUrl)) {
      setError('URL is invalid')
      return
    }

    const body = `I am proving that I own an NFT on ${new Date().toISOString()}`
    const sig = await signMessage({ body })
    try {
      const { error, link } = await createLink({
        sig,
        msg: body,
        contractAddressArray: selectedContract.address,
        linkDestination: selectedUrl
      })
      if (error) {
        setError(error)
        return
      }
      setLink(link)
    } catch (error) {
      console.log('error', error)
      // Getting the Error details.
      // const code = error.code
      const message = error.message
      // const details = error.details
      setError(message)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <div className={classes.root}>
      <header>
        <br />
        <Typography variant='h1' gutterBottom>
          GATE HAUS
        </Typography>
        <Typography variant='h5' gutterBottom>
          Create links that only NFT holders can view
        </Typography>
        <br />
        <br />
      </header>
      <div>

        <Autocomplete
          className={classes.sameWidth}
          options={NFTs}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText="You can also enter a contract address if you don't see the NFT you want" label='Choose your NFT' variant='outlined'
            />
          )}
          value={selectedContract}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setSelectedContract({
                name: newValue,
                address: [newValue]
              })
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setSelectedContract({
                name: newValue.inputValue,
                address: [newValue.inputValue]
              })
            } else {
              setSelectedContract(newValue)
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`
              })
            }

            return filtered
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue
            }
            // Regular option
            return option.name
          }}
          renderOption={(option) => option.name}
          freeSolo
        />
        <br />
        <br />
        <TextField
          variant='outlined'
          label='What URL should the link redirect to?'
          helperText='Only holders of the NFT will be able to view this link'
          className={classes.sameWidth}
          value={selectedUrl}
          onChange={e => setSelectedUrl(e.target.value)}
          placeholder='https://google.com'
        />
        <br />
        <br />
        <br />
        <Button
          variant='contained'
          className={classes.sameWidth}
          onClick={handleCreateLink}
        >
          Create Link
        </Button>
        <br />
        <div style={{ height: 8 }} />
        <Typography variant='caption'>Only holders of the NFT can create links for it</Typography>
        <br />
        <br />
        <Typography className={classes.error} variant='body1'>{error}</Typography>

        <br />
        <br />
        {link
          ? (
            <>
              <Grid
                container
                direction='row'
                spacing={2}
                className={classes.sameWidth}
                alignItems='center'
                justify='center'
              >
                <Grid item>
                  <Typography variant='h6'>
                    Your link is
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <TextField
                    variant='outlined'
                    value={link}
                    className={classes.linkInput}
                    readOnly
                  />
                </Grid>
                <Grid item>
                  <CopyToClipboard
                    text={link}
                    onCopy={() => setSnackbarOpen(true)}
                  >
                    <IconButton><FileCopyOutlinedIcon /></IconButton>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </>
            )
          : null}
        <br />
        <br />
        <br />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          className={classes.snackbar}
          message='Copied'
          action={
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseSnackbar}>
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  )
}

export default App
