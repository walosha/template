import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react'
import { IconButton, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

interface IOption {
  type: string
}
interface SnackbarProp {
  id: string | number
  message?: string
  open: boolean
  type: string
  handleClose: () => void
}

interface IQueue {
  id: string | number
  message?: string
  open: boolean
  options: any
}

const AlertRef = (props: any, ref: any) => (
  <MuiAlert ref={ref} variant='outlined' {...props} />
)

const Alert = React.forwardRef(AlertRef)

const NotificationContext = createContext<{
  showNotification?: (message: string, options: IOption) => number
}>({})

function RenderSnack({ id, message, open, type, handleClose }: SnackbarProp) {
  const messageId = `message-${id}`
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999999 }}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': messageId,
      }}
      message={<span id={messageId}>{message}</span>}
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          onClick={handleClose}
        >
          x
        </IconButton>,
      ]}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: '100%',
          backgroundColor: (theme: any) => theme.palette[type].light,
          borderSize: '1px',
          borderColor: (theme: any) => theme.palette[type].main,
          borderRadius: '4px',
          color: (theme: any) => theme.palette[type].dark,
          '& .MuiAlert-icon': {
            color: (theme: any) => theme.palette[type].dark,
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

const uniqueId = 2

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    current: IQueue | null
    queue: IQueue[]
  }>({ current: null, queue: [] })

  const { current, queue } = useMemo(() => state, [state])

  const showNotification = (message?: string, options?: any) => {
    const id = uniqueId + 1
    const snack: IQueue = { id, message, open: true, options }

    if (current) {
      setState({ current, queue: queue.concat(snack) })
    } else {
      setState({ queue, current: snack })
    }

    return id
  }

  function handleClose() {
    setState((currentState) => ({
      ...currentState,
      current: { ...currentState.current!, open: false },
    }))
    // time to snack close animation
    setTimeout(openNext, 1000)
  }

  function openNext() {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) })
    } else {
      setState({ current: null, queue: [] })
    }
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {current && (
        <RenderSnack
          key={current.id}
          {...current}
          type={current?.options?.type}
          handleClose={handleClose}
        />
      )}
      {children}
    </NotificationContext.Provider>
  )
}

export const useAlert = () => {
  const { showNotification } = useContext(NotificationContext)
  return { showNotification }
}

export default NotificationContext
