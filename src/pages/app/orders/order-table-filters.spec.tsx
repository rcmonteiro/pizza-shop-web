import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { OrderTableFilters } from './order-table-filters'

describe('OrderTableFilters', () => {
  it('should change the url with the given orderId', async () => {
    const user = userEvent.setup()

    const wrapper = render(<OrderTableFilters />, {
      wrapper: ({ children }) => {
        return <MemoryRouter>{children}</MemoryRouter>
      },
    })

    const orderIdField = wrapper.getByRole('textbox', {
      name: 'ID do pedido',
    })
    const submit = wrapper.getByText('Filtrar resultados')

    await user.type(orderIdField, '123')
    await user.click(submit)

    expect(location.href).toContain('orderId=123')
  })

  it('should change the url with the selected status', async () => {
    const user = userEvent.setup()

    const wrapper = render(<OrderTableFilters />, {
      wrapper: ({ children }) => {
        return <MemoryRouter>{children}</MemoryRouter>
      },
    })

    const statusField = wrapper.getByRole('combobox')
    await user.selectOptions(statusField, 'delivered')
    // const submit = wrapper.getByText('Filtrar resultados')

    // await user.type(orderIdField, '123')
    // await user.click(submit)
    console.log(statusField.outerHTML)

    // expect(location.href).toContain('orderId=123')
  })
})
