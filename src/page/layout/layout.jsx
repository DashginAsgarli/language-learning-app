import React from 'react'
import LanguageFeatures from '../../components/LanguageFeatures'
import TopLanguages from '../../components/TopLanguages'
import LangLearn from '../../components/LangLearn'
import DailyChallenge from '../../components/DailyChallenge'
import SmartDictionary from '../../components/SmartDictionary'

function Layout() {
    return (
        <>
            <LanguageFeatures />
            <TopLanguages />
            <LangLearn />
            <DailyChallenge />
            <SmartDictionary />

        </>
    )
}

export default Layout
