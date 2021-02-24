import React from 'react'

class Hola extends React.Component {

    render(){

        return(
            <div>
                <div>
                    <For each="user" index="index" of={this.props.data}>
                        <If condition={ (index%2) === 0}>
                            <h1>{user.name} {user.apellidoPaterno}</h1>
                        </If>

                    </For>
                </div>
            </div>
        )
    }
}

export default Hola;