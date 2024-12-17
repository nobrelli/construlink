import { createHTML } from '@/helpers/createHTML'
import { createStyles } from '@/helpers/createStyles'
import { Spacing, Styled } from '@/theme'
import { useState } from 'react'
import { Platform, View } from 'react-native'
import WebView from 'react-native-webview'
import { ClSpinner } from './ClSpinner'

interface ClWebViewProps {
  html: string
}

export function ClWebView(props: ClWebViewProps) {
  const { html } = props
  const styles = useStyles()
  const [webViewHeight, setWebViewHeight] = useState(0)
  const webViewScript = `
        setTimeout(() => {
            window.ReactNativeWebView.postMessage(document.body.clientHeight)
        }, 500)
    `
  return (
    <View pointerEvents="none" style={{ height: webViewHeight }}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: createHTML({
            preStyles: Styled.RichTextInput.initialCSSText,
            bodyStyles: Styled.RichTextInput.contentCSSText,
            body: html,
            backgroundColor: 'transparent',
            textColor: styles.webviewContainer.color,
          }),
        }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scalesPageToFit={false}
        style={{
          backgroundColor: 'transparent',
          height: webViewHeight,
        }}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        bounces={false}
        renderLoading={() => <ClSpinner />}
        injectedJavaScript={webViewScript}
        onMessage={(event) => setWebViewHeight(Number(event.nativeEvent.data))}
      />
    </View>
  )
}

const useStyles = createStyles(({ colors }) => ({
  webviewContainer: {
    color: colors.primaryText,
    backgroundColor: colors.background,
  },
}))
