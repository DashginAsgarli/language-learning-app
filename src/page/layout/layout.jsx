import React from 'react'
import LanguageFeatures from '../../components/LanguageFeatures'
import TopLanguages from '../../components/TopLanguages'
import LangLearn from '../../components/LangLearn'
import DailyChallenge from '../../components/DailyChallenge'
import SmartDictionary from '../../components/SmartDictionary'
import AudioPractice from '../../components/AudioPractice'
import QuickTranslate from '../../components/QuickTranslate'

function Layout() {
    return (
        <>
            <LanguageFeatures />
            <TopLanguages />
            {/* <LangLearn /> */}
            <DailyChallenge />
            <SmartDictionary />
            <AudioPractice />
            <QuickTranslate/>

        </>
    )
}

export default Layout
