import { Tabs, TabList, Tab, TabPanels, TabPanel, ComponentWithAs, TabsProps } from '@chakra-ui/react';

export interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
}

interface DataTabsProps extends TabsProps {
  tabs: TabItem[];
}

const DataTabs: ComponentWithAs<'div', DataTabsProps> = ({ tabs, ...rest }) => {
  return (
    <Tabs {...rest}>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default DataTabs;
