const { getProjectContentDocs, getProjectBySlug } = require('./src/lib/project');

// Test 1: Get project content docs with different locales
console.log('=== Test 1: Get project content docs with different locales ===');
const testLocales = ['en', 'zh', 'fr'];

// Test each locale
testLocales.forEach(locale => {
  console.log(`\n=== Testing with locale: ${locale} ===`);
  
  const contentDocs = getProjectContentDocs('example-project', locale);
  
  if (contentDocs && contentDocs.length > 0) {
    console.log(`Found ${contentDocs.length} content docs for ${locale}`);
    
    contentDocs.forEach(doc => {
      console.log(`\nDocument: ${doc.name}`);
      console.log(`Title: ${JSON.stringify(doc.meta.title)}`);
      console.log(`Description: ${JSON.stringify(doc.meta.description)}`);
      
      if (doc.versions && doc.versions.length > 0) {
        console.log(`Versions: ${doc.versions.map(v => v.version).join(', ')}`);
        
        // Show a snippet of the first version's content
        const firstVersion = doc.versions[0];
        console.log(`First version content snippet (${locale}): ${firstVersion.content.substring(0, 100)}...`);
        console.log(`First version file path: ${firstVersion.filePath}`);
      }
    });
  } else {
    console.log(`No content docs found for ${locale}`);
  }
});

// Test 2: Get complete project data with different locales
console.log('\n=== Test 2: Get complete project data with different locales ===');

testLocales.forEach(locale => {
  console.log(`\n=== Testing complete project with locale: ${locale} ===`);
  
  const project = getProjectBySlug('example-project', locale);
  
  if (project) {
    console.log(`Project title: ${project.title}`);
    console.log(`Project description: ${project.description}`);
    console.log(`Has content docs: ${project.contentDocs?.length > 0}`);
    
    if (project.contentDocs && project.contentDocs.length > 0) {
      console.log(`First doc: ${project.contentDocs[0].name}`);
      console.log(`First doc first version content snippet: ${project.contentDocs[0].versions[0].content.substring(0, 100)}...`);
    }
  } else {
    console.log(`Project not found for ${locale}`);
  }
});

console.log('\n=== All tests completed! ===');
