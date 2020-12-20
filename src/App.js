import React from 'react';
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms'
import logo from './Icon.svg';
import './App.css';

function App() {
  const cms = new TinaCMS({
    sidebar: true,
  })
  return (
    <TinaProvider cms={cms}>
      <div className="App">
        <PageContent />
      </div>
    </TinaProvider>
  );
}

export default App;

const pageData = {
  title: 'Tina is not a CMS',
  body: 'It is a toolkit for creating a custom CMS.',
};

function PageContent() {
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Body',
        component: 'textarea',
      }
    ],
    initialValues: pageData,
    onSubmit: () => window.alert('Saved!')
  }

  const [editableData, form] = useForm(formConfig)

  usePlugin(form)

  return (
    <section className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>{editableData.title}</h1>
      <p>{editableData.body}</p>
      <EditButton />
    </section>
  );
}

function EditButton() {
  const cms = useCMS()
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
}
