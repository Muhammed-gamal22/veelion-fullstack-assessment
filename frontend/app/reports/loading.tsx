import CustomLoader from '@/customs/CustomLoader'
import React from 'react'

const loading = () => {
    return (
        <div style={{
            height: "calc(100vh - 200px)",
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CustomLoader />
        </div>
    )
}

export default loading