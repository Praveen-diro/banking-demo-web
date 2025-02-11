import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';
import { PieChart, Pie, Cell } from 'recharts';
import { CreditCard, CreditCardBack } from '../components/CreditCard';
import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';

interface CardData {
  id: string;
  cardHolder: string;
  cardNumber: string;
  validThru: string;
  balance: number;
}

interface CardListItem {
  cardType: string;
  bank: string;
  cardNumber: string;
  namainCard: string;
  cardColor?: string;
}

const CreditCards: React.FC = () => {
  const cards: CardData[] = [
    {
      id: '1',
      cardHolder: 'Eddy Cusuma',
      cardNumber: '3778 **** **** 1234',
      validThru: '12/22',
      balance: 5756,
    },
    {
      id: '2',
      cardHolder: 'Eddy Cusuma',
      cardNumber: '3778 **** **** 1234',
      validThru: '12/22',
      balance: 5756,
    },
    {
      id: '3',
      cardHolder: 'Eddy Cusuma',
      cardNumber: '3778 **** **** 1234',
      validThru: '12/22',
      balance: 5756,
    },
  ];

  const cardList: CardListItem[] = [
    {
      cardType: 'Secondary',
      bank: 'DBL Bank',
      cardNumber: '**** **** 5500',
      namainCard: 'William',
      cardColor: '#4461F2',
    },
    {
      cardType: 'Secondary',
      bank: 'BRC Bank',
      cardNumber: '**** **** 4300',
      namainCard: 'Michel',
      cardColor: '#FF4B91',
    },
    {
      cardType: 'Secondary',
      bank: 'ABM Bank',
      cardNumber: '**** **** 7500',
      namainCard: 'Edward',
      cardColor: '#FFB74B',
    },
  ];

  const expenseData = [
    { name: 'DBL Bank', value: 25, color: '#4461F2', startAngle: 0 },
    { name: 'ABM Bank', value: 25, color: '#00E2C3', startAngle: 90 },
    { name: 'BRC Bank', value: 25, color: '#FF4B91', startAngle: 180 },
    { name: 'MCP Bank', value: 25, color: '#FFB74B', startAngle: 270 },
  ];

  return (
    <Layout title="Credit Cards">
    <PageContainer>
      {/* <Sidebar /> */}
      

      {/* <MainWrapper> */}
        {/* <Header className="ml-4" title="Credit Cards" /> */}
        <Container>
         

          <MainContent>
            <LeftSection>
              <SectionTitle>My Cards</SectionTitle>
              <CardsSection>
                <CardContainer>
                  <CreditCard 
                    balance={5756788234}
                    cardHolder="Eric Garcetti"
                    cardNumber="6543 **** **** 0987"
                    expiryDate="12/29"
                  />
                  <CreditCard 
                    balance={10025756}
                    cardHolder="Eric Garcetti"
                    cardNumber="8961 **** **** 1002"
                    expiryDate="12/29"
                  />
                  <CreditCardBack
                    balance={5756}
                    cardHolder="Eric Garcetti"
                    cardNumber="1022 **** **** 1928"
                    expiryDate="12/22"
                  />
                </CardContainer>
              </CardsSection>
            </LeftSection>

            <MiddleRow>
              <Statistics>
                <SectionTitle>Card Expense Statistics</SectionTitle>
                <StatisticsContent>
                  <PieChart width={160} height={160}>
                    <Pie
                      data={expenseData}
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                      startAngle={0}
                      endAngle={360}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  <Legend>
                    {expenseData.map((entry, index) => (
                      <LegendItem key={index}>
                        <LegendColor style={{ background: entry.color }} />
                        <LegendText>{entry.name}</LegendText>
                      </LegendItem>
                    ))}
                  </Legend>
                </StatisticsContent>
              </Statistics>

              <CardListSection>
                <SectionTitle>Card List</SectionTitle>
                <CardListContainer>
                  {cardList.map((item, index) => (
                    <CardListRow key={index}>
                      <CardIcon style={{ background: item.cardColor }} />
                      <CardInfo>
                        <CardInfoGroup>
                          <Label>Card Type</Label>
                          <Value>{item.cardType}</Value>
                        </CardInfoGroup>
                        <CardInfoGroup>
                          <Label>Bank</Label>
                          <Value>{item.bank}</Value>
                        </CardInfoGroup>
                        <CardInfoGroup>
                          <Label>Card Number</Label>
                          <Value>{item.cardNumber}</Value>
                        </CardInfoGroup>
                        <CardInfoGroup>
                          <Label>Namain Card</Label>
                          <Value>{item.namainCard}</Value>
                        </CardInfoGroup>
                      </CardInfo>
                      <ViewButton>View Details</ViewButton>
                    </CardListRow>
                  ))}
                </CardListContainer>
              </CardListSection>
            </MiddleRow>

            <BottomRow>
              <AddCardSection>
                <SectionTitle>Add New Card</SectionTitle>
                <CardDescription>
                  Credit Card generally means a plastic card issued by Scheduled Commercial Banks,
                  assigned to a Cardholder, with a credit limit, that can be used to purchase goods
                  and services on credit or obtain cash advances.
                </CardDescription>
                <CardForm>
                  <FormRow>
                    <FormGroup>
                      <label>Card Type</label>
                      <input type="text" placeholder="Classic" />
                    </FormGroup>
                    <FormGroup>
                      <label>Name On Card</label>
                      <input type="text" placeholder="My Cards" />
                    </FormGroup>
                  </FormRow>
                  <FormRow>
                    <FormGroup>
                      <label>Card Number</label>
                      <input type="text" placeholder="**** **** **** ****" />
                    </FormGroup>
                    <FormGroup>
                      <label>Expiration Date</label>
                      <input type="text" placeholder="25 January 2025" />
                    </FormGroup>
                  </FormRow>
                  <AddCardButton>Add Card</AddCardButton>
                </CardForm>
              </AddCardSection>
              <RightSection>
                <SectionTitle>Card Setting</SectionTitle>
                <SettingsList>
                  <SettingItem>
                    <SettingIcon style={{ background: '#FFB74B' }}>🔒</SettingIcon>
                    <SettingContent>
                      <SettingTitle>Block Card</SettingTitle>
                      <SettingDescription>Instantly block your card</SettingDescription>
                    </SettingContent>
                  </SettingItem>
                  <SettingItem>
                    <SettingIcon style={{ background: '#4461F2' }}>🔑</SettingIcon>
                    <SettingContent>
                      <SettingTitle>Change Pin Code</SettingTitle>
                      <SettingDescription>Choose another pin code</SettingDescription>
                    </SettingContent>
                  </SettingItem>
                  <SettingItem>
                    <SettingIcon style={{ background: '#FF4B91' }}>G</SettingIcon>
                    <SettingContent>
                      <SettingTitle>Add to Google Pay</SettingTitle>
                      <SettingDescription>Withdraw without any card</SettingDescription>
                    </SettingContent>
                  </SettingItem>
                  <SettingItem>
                    <SettingIcon style={{ background: '#4461F2' }}>A</SettingIcon>
                    <SettingContent>
                      <SettingTitle>Add to Apple Pay</SettingTitle>
                      <SettingDescription>Withdraw without any card</SettingDescription>
                    </SettingContent>
                  </SettingItem>
                  <SettingItem>
                    <SettingIcon style={{ background: '#4461F2' }}>A</SettingIcon>
                    <SettingContent>
                      <SettingTitle>Add to Apple Store</SettingTitle>
                      <SettingDescription>Withdraw without any card</SettingDescription>
                    </SettingContent>
                  </SettingItem>
                </SettingsList>
              </RightSection>
            </BottomRow>

          </MainContent>
        </Container>
      {/* </MainWrapper> */}
    </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 1;
  margin-left: 240px;
  background: #F8F9FD;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Container = styled.div`
  padding: 24px;
  background: #F8F9FD;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  color: #1A1D1F;
  font-weight: 600;
`;

const CardsSection = styled.div`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 8px 4px;
  width: 100%;
  justify-content: space-between;

  > * {
    min-width: 380px;
    flex: 1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 1024px) {
    > * {
      min-width: 300px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
    gap: 16px;
    
    > * {
      min-width: 100%;
      width: 100%;
    }
  }
`;

const CardItem = styled.div<{ $isMiddle?: boolean }>`
  background: ${props => props.$isMiddle ? 
    'linear-gradient(to right, #3A3BF3, #4461F2)' : 
    'linear-gradient(to right, #4461F2, #3A3BF3)'};
  border-radius: 16px;
  padding: 24px;
  min-width: 300px;
  color: white;
  transform: ${props => props.$isMiddle ? 'scale(1.05)' : 'scale(1)'};
  transition: transform 0.3s ease;
`;

const Balance = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 48px;
`;

const CardHolder = styled.div`
  margin-bottom: 24px;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardNumber = styled.div``;

const ValidThru = styled.div``;

const Statistics = styled.div`
  height: auto;
`;

const CardListSection = styled.div`
  height: auto;
`;

const DonutChartPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const CardListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  height: 280px;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const CardListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 16px;
`;

const CardInfo = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CardInfoGroup = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-size: 12px;
  color: #6F767E;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 14px;
  color: #1A1D1F;
`;

const ViewButton = styled.button`
  color: #4461F2;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
    background: #F8F9FD;
    border-radius: 8px;
    margin-top: 8px;
  }
`;

const CardDescription = styled.p`
  color: #6F767E;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const CardForm = styled.form`
  background: white;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    color: #1A1D1F;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #E6E8EC;
    border-radius: 8px;
    font-size: 14px;
    
    &::placeholder {
      color: #6F767E;
    }
  }
`;

const AddCardButton = styled.button`
  background: #1814F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
  margin-top: 16px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SettingsList = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #E6E8EC;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 16px;
`;

const SettingContent = styled.div``;

const SettingTitle = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: #6F767E;
  margin-top: 2px;
`;

const AddCardSection = styled.div`
  margin-bottom: 32px;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  margin-bottom: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StatisticsContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  
  .recharts-wrapper {
    height: 160px !important;
    width: 160px !important;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    
    .recharts-wrapper {
      height: 140px !important;
      width: 140px !important;
    }
  }
`;

const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const LegendText = styled.span`
  font-size: 12px;
  color: #6F767E;
`;

export default CreditCards;