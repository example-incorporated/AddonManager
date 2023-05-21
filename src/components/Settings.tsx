import {Constants, React, StyleSheet} from "enmity/metro/common"
import {get, set} from "enmity/api/settings"
import {FormRow, FormSection, FormSwitch, ScrollView} from "enmity/components"

// @ts-ignore
import {name as plugin_name} from '../../manifest.json'
import {Icons} from "../utils/common"
import {checkUpdate} from "../utils/updater"

function Settings() {
    const styles = StyleSheet.createThemedStyleSheet({
        container: {
            flex: 1,
            backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY,
        }
    })
    const [switchVal, setSwitchVal] = React.useState(Boolean(get(plugin_name, "check_updates_me",true))) // 格納されている値は0,1になっているので真偽値に変換
    const [switchVal2, setSwitchVal2] = React.useState(Boolean(get(plugin_name, "add_to_settings",true))) // 格納されている値は0,1になっているので真偽値に変換


    return (
        <ScrollView style={styles.container}>
            <FormSection title="OPTIONS">
                <FormRow
                    label="Check updates of AddonManager itself on startup"
                    subLabel="You can also click here to check updates manually"
                    leading={<FormRow.Icon source={Icons.Update}/>}
                    trailing={
                        <FormSwitch
                            value={switchVal}
                            onValueChange={(value) => {
                                setSwitchVal(value)
                                set(plugin_name, "check_updates_me", value)
                            }}
                        />
                    }
                    onPress={() => {
                        checkUpdate(true)
                    }}
                />
                <FormRow
                    label="Add the AddonManager section to settings"
                    leading={<FormRow.Icon source={Icons.Add}/>}
                    trailing={
                        <FormSwitch
                            value={switchVal2}
                            onValueChange={(value) => {
                                setSwitchVal2(value)
                                set(plugin_name, "add_to_settings", value)
                            }}
                        />
                    }
                />
            </FormSection>
        </ScrollView>
    )
}

export {Settings}