import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'

export default class AboutScreen extends Component {
  render() {
    return (
        <div>
          <div>
            <Header />
          </div>
        <div className='flex flex-1 justify-center items-center h-[40rem] flex-col p-10 text-3xl text-gray-600'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae metus vel urna luctus efficitur id nec ante. Sed id metus ac elit scelerisque auctor ut ut lacus. Pellentesque diam purus, semper eget venenatis lacinia, cursus ut diam. In convallis a nibh et blandit. Vestibulum sapien mauris, congue a arcu nec, rhoncus iaculis nisl. Nullam cursus pretium tellus in porta. Ut accumsan sem at pellentesque gravida. Donec pharetra, nibh nec molestie consequat, dolor dui venenatis neque, nec tempus est metus efficitur nisl. Proin ante nulla, dictum quis commodo vitae, laoreet eu ante. Nam sit amet bibendum turpis, eget maximus lorem. Mauris a interdum dolor, non euismod risus. Vivamus accumsan diam eu elit fermentum, eu dapibus nisi hendrerit. Maecenas accumsan lectus ac porttitor ultrices.
        <br />
Integer commodo elementum est in accumsan. Vestibulum eu porttitor augue. Nunc in lobortis diam. Pellentesque volutpat feugiat ante vel imperdiet. Vestibulum consectetur facilisis venenatis. Etiam nec ex erat. Cras nec convallis arcu. Nullam gravida sodales lectus sed pellentesque. Sed venenatis finibus ligula, eget imperdiet felis mollis in. Suspendisse at sapien et dui feugiat eleifend et in quam. Sed venenatis, velit in venenatis hendrerit, velit ipsum iaculis nulla, quis luctus turpis lorem eget magna. Vivamus sagittis dui nec ipsum rhoncus, sed tempor lorem lacinia. Integer in ante non erat mollis iaculis vel in magna. Duis iaculis lacus suscipit mollis maximus. Nullam vitae turpis eget orci pulvinar sollicitudin. Suspendisse fermentum, mi a elementum faucibus, enim metus tincidunt lacus, at sollicitudin felis erat eu turpis.
        </div>
        <SmallFooter />
      </div>
    )
  }
}
