import { Callback } from "app/types"
import { LoginInputType, SignupInputType } from "app/auth/validations"
import { CSSProperties, useState } from "react"
import { Button, TextField } from "@material-ui/core"
import { createStyle } from "app/utils"

type HeaderPropType = {
  login: Callback<LoginInputType>
  signup: Callback<SignupInputType>
  logout: Callback<null>
  isLoggedIn: boolean
}

const Header = ({ login, signup, logout, isLoggedIn }: HeaderPropType) => {
  const [field, setField] = useState({ email: "", password: "" })
  const [onSignup, setOnSignup] = useState(false)
  const [onLogin, setOnLogin] = useState(false)
  const [popupMessage, setPopupMessage] = useState<string | null>(null)

  return (
    <div style={styles.header}>
      <div style={styles.titleWrapper}>
        <div style={styles.title}>NicoReader</div>
      </div>
      <div style={styles.buttonWrapper}>
        {!isLoggedIn && (
          <div style={styles.headerButton}>
            <div style={styles.headerButtonText} onClick={() => setOnSignup(true)}>
              Signup
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div style={styles.headerButton}>
            <div style={styles.headerButtonText} onClick={(_) => setOnLogin(true)}>
              Signin
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div style={styles.headerButton}>
            <div style={styles.headerButtonText} onClick={() => logout(null)}>
              Logout
            </div>
          </div>
        )}
      </div>
      {onLogin && (
        <div style={styles.popup}>
          <div style={styles.popupInner}>
            <h1>サインイン</h1>
            {popupMessage != null && <span style={styles.popupMessage}>{popupMessage}</span>}
            <form
              onSubmit={(e) => {
                login(field)
                setOnLogin(false)
                e.preventDefault()
              }}
            >
              <TextField
                type="text"
                label="ユーザー名"
                defaultValue=""
                value={field.email}
                onChange={(e) => setField((f) => ({ ...f, email: e.target.value }))}
              />
              <br />
              <TextField
                type="password"
                label="パスワード"
                value={field.password}
                onChange={(e) => setField((f) => ({ ...f, password: e.target.value }))}
              />
              <br />
              <Button type="submit">ログイン</Button>
              <Button onClick={() => setOnLogin(false)}>閉じる</Button>
            </form>
          </div>
        </div>
      )}
      {onSignup && (
        <div style={styles.popup}>
          <div style={styles.popupInner}>
            <h1>サインアップ</h1>
            {popupMessage != null && <span style={styles.popupMessage}>{popupMessage}</span>}
            <form
              onSubmit={(e) => {
                signup(field)
                setOnSignup(false)
                e.preventDefault()
              }}
            >
              <TextField
                type="email"
                label="メールアドレス"
                defaultValue=""
                value={field.email}
                onChange={(e) => setField((f) => ({ ...f, email: e.target.value }))}
              />
              <br />
              <TextField
                type="password"
                label="パスワード"
                value={field.password}
                onChange={(e) => setField((f) => ({ ...f, password: e.target.value }))}
              />
              <br />
              <br />
              <Button type="submit">登録</Button>
              <Button onClick={() => setOnSignup(false)}>閉じる</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header

const styles = createStyle({
  header: {
    backgroundColor: "#292929",
    height: 40,
    color: "#CECECE",
    fontFamily: "PT Sans, sans-serif",
    WebkitFontSmoothing: "antialiased",
    position: "relative",
  },
  titleWrapper: {
    margin: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  title: {
    fontSize: 20,
  },
  buttonWrapper: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerButton: {
    width: 80,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    float: "right",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 15,
    cursor: "pointer",
  },
  popupMessage: {
    color: "red",
    fontSize: 10,
  },
  popup: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  },
  popupInner: {
    position: "absolute",
    left: "35%",
    right: "35%",
    top: "25%",
    paddingTop: "20px",
    paddingBottom: "20px",
    margin: "auto",
    textAlign: "center",
    background: "white",
    borderRadius: "10px",
  },
})
