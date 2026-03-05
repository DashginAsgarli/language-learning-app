import React from 'react'
import LangLearn from '../../components/lessons/LangLearn'
import AudioPractice from '../../components/lessons/AudioPractice'
import DailyWord from '../../components/lessons/DailyWord'
import QuickTranslate from '../../components/lessons/QuickTranslate'
import SmartDictionary from '../../components/lessons/SmartDictionary'

function Lessons() {
    return (
        <>
            <SmartDictionary />
            
            {/* <LangLearn /> */}
            <AudioPractice />
            <DailyWord />
            <QuickTranslate />


        </>
    )
}

export default Lessons
